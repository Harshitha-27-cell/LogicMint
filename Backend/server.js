import exp from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import { userApp } from "./API/UserAPI.js";
import { authApp } from "./API/AuthAPI.js";
import { compilerApp } from "./API/CompilerAPI.js";
import { questionApp } from "./API/QuestionAPI.js";
import { contestApp } from "./API/ContestAPI.js";
import { dashboardApp } from "./API/DashboardAPI.js";
import { adminApp } from "./API/AdminAPI.js";
import { leaderboardApp } from "./API/LeaderboardAPI.js";
import { aiApp } from "./API/AIAPI.js";
import { notificationApp } from "./API/NotificationAPI.js";
import { createNotification } from "./API/NotificationAPI.js";

dotenv.config();

const app = exp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://logic-mint.vercel.app"
    ],
    credentials: true
  }
});

app.use(exp.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://logic-mint.vercel.app"
    ],
    credentials: true
  })
);

mongoose
  .connect(process.env.DB_URL, {
    tls: true,
    tlsAllowInvalidCertificates: true
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log("DB Connection Error:");
    console.log(err);
  });

// Socket.io — real-time notifications
io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    if (userId) socket.join(`user:${userId}`);
  });

  socket.on("disconnect", () => {});
});

export function emitNotification(userId, payload) {
  io.to(`user:${userId}`).emit("notification", payload);
}

export { createNotification };

// Routes
app.get("/", (req, res) => {
  res.send("LogicMint Backend Running");
});

app.use("/user-api", userApp);
app.use("/api/auth", authApp);
app.use("/compiler-api", compilerApp);
app.use("/question-api", questionApp);
app.use("/contest-api", contestApp);
app.use("/dashboard-api", dashboardApp);
app.use("/admin-api", adminApp);
app.use("/leaderboard-api", leaderboardApp);
app.use("/ai-api", aiApp);
app.use("/notification-api", notificationApp);

// 404 — must be last
app.use((req, res) => {
  res.status(404).send({ message: "Invalid path" });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
