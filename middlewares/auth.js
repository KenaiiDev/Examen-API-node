import jwt from "jsonwebtoken";
import ROLES from "../helpers/roles.js";
import httpStatus from "../helpers/httpStatus.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { role } = decoded.user;

  if (role !== ROLES.ADMIN) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized" });
  }

  next();
};
