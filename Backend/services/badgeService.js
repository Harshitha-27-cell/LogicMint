import { BadgeModel } from "../Models/BadgeModel.js";

const BADGE_META = {
  first_solve: {
    title: "First Solve",
    description: "Solved your first problem"
  },
  contest_top: {
    title: "Contest Champion",
    description: "Top performer in a contest"
  },
  leaderboard_top: {
    title: "Leaderboard Star",
    description: "Reached top 3 on global leaderboard"
  },
  sharp_mind: {
    title: "Sharp Mind",
    description: "Maintained 80%+ accuracy"
  },
  streak: {
    title: "7 Day Streak",
    description: "Coded 7 days in a row"
  }
};

/** Award badge once per user per type */
export async function awardBadge(userId, type) {
  const meta = BADGE_META[type];
  if (!meta) return null;

  const existing = await BadgeModel.findOne({ userId, type });
  if (existing) return existing;

  return BadgeModel.create({
    userId,
    type,
    title: meta.title,
    description: meta.description
  });
}

export async function getUserBadges(userId) {
  return BadgeModel.find({ userId }).sort({ earnedAt: -1 });
}
