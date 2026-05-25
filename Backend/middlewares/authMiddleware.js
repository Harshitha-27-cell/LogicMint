import jwt from "jsonwebtoken";

/** Verify JWT access token from Authorization header */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};

/** Require admin role (from JWT or hardcoded admin login) */
export const verifyAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).send({ message: "Admin access required" });
};
