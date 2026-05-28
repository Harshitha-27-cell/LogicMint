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

const PASSWORD_REGEX =
  /^(?=(?:.*[A-Za-z]){3,})(?=(?:.*\d){3,})(?=(?:.*[!@#$%^&*]){1,}).+$/;

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
}

function validatePasswordPolicy(password) {
  return PASSWORD_REGEX.test(password || "");
}

function validateGmail(email) {
  return GMAIL_REGEX.test((email || "").trim());
}

/* ================= EMAIL SENDER ================= */

async function sendResetEmail(toEmail, resetToken) {
  const frontendUrl =
    process.env.FRONTEND_URL || "http://localhost:5173";

  const resetLink = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(
    toEmail
  )}`;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);

  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;

  const smtpFrom =
    process.env.SMTP_FROM ||
    `LogicMint Support <${smtpUser}>`;

  console.log({
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPassExists: !!smtpPass,
  });

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("SMTP not configured");

    return {
      sent: false,
      resetLink,
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,

    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: toEmail,
    subject: "Reset your LogicMint password",

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: auto; padding: 20px;">

        <h2 style="color:#8b5e3c;">
          Reset your LogicMint password
        </h2>

        <p>
          You requested a password reset.
        </p>

        <p>
          Click the button below to continue:
        </p>

        <a
          href="${resetLink}"
          target="_blank"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#8b5e3c;
            color:white;
            text-decoration:none;
            border-radius:8px;
            font-weight:bold;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:25px;">
          If the button doesn't work, open this link:
        </p>

        <p>
          <a href="${resetLink}" target="_blank">
            ${resetLink}
          </a>
        </p>

        <p>
          This link expires in 1 hour.
        </p>

      </div>
    `,
  });

  return {
    sent: true,
    resetLink,
  };
}

/* ================= REGISTER ================= */

authApp.post("/register", async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    if (!validateGmail(email)) {
      return res.status(400).send({
        message:
          "Use a valid Gmail address.",
      });
    }

    if (!validatePasswordPolicy(password)) {
      return res.status(400).send({
        message:
          "Password must include at least 3 letters, 3 numbers, and 1 special character.",
      });
    }

    const existing = await UserModel.findOne({ email });

    if (existing) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      email,
      password: hashed,
      profilePic: profilePic || "",
      isDisabled: false,
      role: "user",
    });

    res.send({
      message: "Signup successful",
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Signup error",
    });
  }
});

/* ================= LOGIN ================= */

authApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateGmail(email)) {
      return res.status(400).send({
        message: "Invalid Gmail address",
      });
    }

    if (!validatePasswordPolicy(password)) {
      return res.status(400).send({
        message: "Invalid password format",
      });
    }

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      const accessToken = signAccessToken({
        role: "admin",
      });

      const refreshToken = signRefreshToken({
        role: "admin",
      });

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
        },
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "Invalid email",
      });
    }

    if (user.isDisabled) {
      return res.status(403).send({
        message: "Account disabled",
      });
    }

    const matched = await bcrypt.compare(
      password,
      user.password
    );

    if (!matched) {
      return res.status(401).send({
        message: "Invalid password",
      });
    }

    const accessToken = signAccessToken({
      id: user._id,
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      id: user._id,
    });

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
        role: user.role,
        isDisabled: user.isDisabled,
        admin: user.role === "admin",
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Login error",
    });
  }
});

/* ================= FORGOT / RESET PASSWORD ================= */

authApp.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    /* ===== RESET PASSWORD ===== */

    if (newPassword && resetToken) {
      const user = await UserModel.findOne({
        email,
        resetToken,
        resetTokenExpiry: {
          $gt: Date.now(),
        },
      });

      if (!user) {
        return res.status(400).send({
          message:
            "Invalid or expired reset token",
        });
      }

      if (!validatePasswordPolicy(newPassword)) {
        return res.status(400).send({
          message:
            "Password format invalid",
        });
      }

      user.password = await bcrypt.hash(
        newPassword,
        10
      );

      user.resetToken = "";
      user.resetTokenExpiry = undefined;

      await user.save();

      return res.send({
        message:
          "Password reset successful",
      });
    }

    /* ===== SEND RESET EMAIL ===== */

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "No such email exists",
      });
    }

    const token = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetToken = token;

    user.resetTokenExpiry = new Date(
      Date.now() + 3600000
    );

    await user.save();

    const emailResult = await sendResetEmail(
      email,
      token
    );

    res.send({
      message: emailResult.sent
        ? "Password reset link sent to your email."
        : "Email service is not configured.",
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Reset error",
    });
  }
});