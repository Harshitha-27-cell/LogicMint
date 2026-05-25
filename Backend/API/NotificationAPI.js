import exp from "express";
import { NotificationModel } from "../Models/NotificationModel.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const notificationApp = exp.Router();

/** GET /notification-api — user notifications */
notificationApp.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await NotificationModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.send(notifications);
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
});

/** PUT /notification-api/read/:id */
notificationApp.put("/read/:id", verifyToken, async (req, res) => {
  try {
    await NotificationModel.findByIdAndUpdate(req.params.id, { read: true });
    res.send({ message: "Marked as read" });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
});

/** Helper: create notification (used by other modules) */
export async function createNotification(userId, title, message, type = "info") {
  const n = await NotificationModel.create({ userId, title, message, type });
  return n;
}

export { notificationApp };
