import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Acces denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET);
    // req.user = verified;
    next();
  } catch (err) {
    res.status(403).send("Invalid token");
  }
}
