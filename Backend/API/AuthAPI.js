import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { UserModel } from "../Models/UserModel.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

export const authApp = exp.Router();

const ADMIN_EMAIL = "admin@logicmint.com";
const ADMIN_PASSWORD = "LogicMint123";
const GMAIL_REGEX = /^[A-Za-z][A-Za-z0-9]{4,}@gmail\.com$/;
const PASSWORD_REGEX = /^(?=(?:.*[A-Za-z]){3,})(?=(?:.*\d){3,})(?=(?:.*[!@#$%^&*]){1,}).+$/;

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
}

function validatePasswordPolicy(password) {
  return PASSWORD_REGEX.test(password || "");
}

function validateGmail(email) {
  return GMAIL_REGEX.test((email || "").trim());
}

/**
 * Sends password reset email using SMTP credentials from environment.
 * Falls back to a logged link in development if SMTP is not configured.
 */
async function sendResetEmail(toEmail, resetToken) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetLink = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(toEmail)}`;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || "LogicMint Support <no-reply@logicmint.com>";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("SMTP not configured. Reset link:", resetLink);
    return { sent: false, resetLink };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: toEmail,
    subject: "LogicMint password reset",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #3d2e24;">
        <h2 style="color: #8b5e3c;">Reset your LogicMint password</h2>
        <p>You requested a password reset. Click the button below to continue.</p>
        <a href="${resetLink}" style="display: inline-block; margin: 16px 0; padding: 12px 20px; background: #8b5e3c; color: #fff; text-decoration: none; border-radius: 8px;">
          Reset password
        </a>
        <p>This link expires in 1 hour.</p>
      </div>
    `
  });

  return { sent: true, resetLink };
}

/** POST /api/auth/register */
authApp.post("/register", async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    if (!validateGmail(email)) {
      return res.status(400).send({
        message:
          "Use a valid Gmail address: start with a letter, include at least 5 characters before @, and end with @gmail.com."
      });
    }

    if (!validatePasswordPolicy(password)) {
      return res.status(400).send({
        message:
          "Password must include at least 3 letters, 3 numbers, and 1 special character from !@#$%^&*."
      });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await UserModel.create({
      username,
      email,
      password: hashed,
      profilePic: profilePic || "",
      isDisabled: false,
      role: "user"
    });
    res.send({ message: "Signup successful. You can login now." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Signup error" });
  }
});

/** POST /api/auth/login */
authApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateGmail(email)) {
      return res.status(400).send({
        message: "Enter a valid Gmail address ending with @gmail.com."
      });
    }

    if (!validatePasswordPolicy(password)) {
      return res.status(400).send({
        message:
          "Password format is invalid. It must include at least 3 letters, 3 numbers, and 1 special character."
      });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const accessToken = signAccessToken({ role: "admin" });
      const refreshToken = signRefreshToken({ role: "admin" });
      return res.send({
        message: "Admin login success",
        accessToken,
        refreshToken,
        token: accessToken,
        user: {
          username: "Admin",
          email: ADMIN_EMAIL,
          profilePic: "",
          role: "admin",
          admin: true,
          isDisabled: false
        }
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ message: "Invalid email" });
    if (user.isDisabled) {
      return res.status(403).send({ message: "You are disabled. Contact admin." });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(401).send({ message: "Invalid password" });

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    res.send({
      message: "Login successful",
      accessToken,
      refreshToken,
      token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role || "user",
        isDisabled: user.isDisabled,
        admin: user.role === "admin"
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Login error" });
  }
});

/** POST /api/auth/logout */
authApp.post("/logout", verifyToken, async (req, res) => {
  try {
    if (req.user?.id) {
      await UserModel.findByIdAndUpdate(req.user.id, { refreshToken: "" });
    }
    res.send({ message: "Logged out" });
  } catch (err) {
    res.status(500).send({ message: "Logout error" });
  }
});

/** GET /api/auth/me */
authApp.get("/me", verifyToken, async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const user = await UserModel.findById(req.user.id).select(
      "_id username email profilePic role createdAt isDisabled"
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Unable to fetch profile" });
  }
});

/** POST /api/auth/refresh */
authApp.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).send({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);

    if (decoded.role === "admin") {
      const accessToken = signAccessToken({ role: "admin" });
      return res.send({ accessToken, token: accessToken });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).send({ message: "Invalid refresh token" });
    }

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    res.send({ accessToken, token: accessToken });
  } catch {
    res.status(403).send({ message: "Invalid refresh token" });
  }
});

/** POST /api/auth/reset-password — request reset */
authApp.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    if (newPassword && resetToken) {
      if (!validateGmail(email)) {
        return res.status(400).send({
          message: "Enter the same valid Gmail address used during signup."
        });
      }
      if (!validatePasswordPolicy(newPassword)) {
        return res.status(400).send({
          message:
            "New password must include at least 3 letters, 3 numbers, and 1 special character."
        });
      }
      const user = await UserModel.findOne({
        email,
        resetToken,
        resetTokenExpiry: { $gt: Date.now() }
      });
      if (!user) {
        return res.status(400).send({ message: "Invalid or expired reset token" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetToken = "";
      user.resetTokenExpiry = undefined;
      await user.save();
      return res.send({ message: "Password reset successful" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({
        message: "If that email exists, a reset link was sent.",
        resetToken: null
      });
    }

    if (!validateGmail(email)) {
      return res.status(400).send({
        message: "Enter a valid Gmail address ending with @gmail.com."
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    const emailResult = await sendResetEmail(email, token);

    res.send({
      message: emailResult.sent
        ? "Password reset link sent to your email."
        : "Reset link generated. Email service is not configured yet.",
      resetToken: emailResult.sent ? null : token
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Reset error" });
  }
});

/** POST /api/auth/verify-email — stub for email verification flow */
authApp.post("/verify-email", async (req, res) => {
  res.send({ message: "Email verification is not configured. Account is active." });
});

/** POST /api/auth/google — Continue with Google */
authApp.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).send({ message: "Google credential required" });
    }

    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    const payload = await googleRes.json();

    if (!googleRes.ok || !payload.email) {
      return res.status(401).send({ message: "Invalid Google token" });
    }

    if (!validateGmail(payload.email)) {
      return res.status(400).send({
        message: "Only Gmail accounts are allowed for this platform."
      });
    }

    let user = await UserModel.findOne({
      $or: [{ googleId: payload.sub }, { email: payload.email }]
    });

    if (!user) {
      user = await UserModel.create({
        username: payload.name || payload.email.split("@")[0],
        email: payload.email,
        password: await bcrypt.hash(payload.sub + process.env.SECRET_KEY, 10),
        profilePic: payload.picture || "",
        googleId: payload.sub,
        role: "user",
        isDisabled: false
      });
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      if (payload.picture) user.profilePic = payload.picture;
      await user.save();
    }

    if (user.isDisabled) {
      return res.status(403).send({ message: "Account disabled" });
    }

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    res.send({
      message: "Google login success",
      accessToken,
      refreshToken,
      token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role || "user",
        isDisabled: user.isDisabled,
        admin: user.role === "admin"
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Google login failed" });
  }
});
