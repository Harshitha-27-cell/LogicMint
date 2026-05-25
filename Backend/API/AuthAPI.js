import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel } from "../Models/UserModel.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

export const authApp = exp.Router();

const ADMIN_EMAIL = "admin@logicmint.com";
const ADMIN_PASSWORD = "LogicMint123";

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
}

/** POST /api/auth/register */
authApp.post("/register", async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;
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
      const user = await UserModel.findOne({
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

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    res.send({
      message: "Reset token generated. Use it on the reset password page.",
      resetToken: token
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
