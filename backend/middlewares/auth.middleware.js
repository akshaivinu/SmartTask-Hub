import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  const secretKey = JWT_SECRET;

  try {
    const token = req.cookies["jwt"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, secretKey);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware protectRoute", error.message);
    res.status(500).json({ message: error.message });
  }
};
