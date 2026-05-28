import mongoose from "mongoose";

/** User-earned badges (first solve, contest top, leaderboard, etc.) */
const badgeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["first_solve", "contest_top", "leaderboard_top", "streak", "sharp_mind"],
      required: true
    },
    title: String,
    description: String,
    earnedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

badgeSchema.index({ userId: 1, type: 1 }, { unique: true });

export const BadgeModel =
  mongoose.models.Badge || mongoose.model("Badge", badgeSchema);
