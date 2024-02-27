import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ModifiedReq } from "../models/ModifiedRequest";

const jwtSecretString: string | undefined = process.env.JWTSECRET;

const JWT_SECRET: Buffer = Buffer.from(jwtSecretString || "secret", "utf-8");

export const generateToken = (
  username: string,
  password: string,
  role: string
): string => {
  return jwt.sign({ username, password, role }, JWT_SECRET, {
    expiresIn: "5h",
  });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.body.authorization;

  if (token == null) {
    res.sendStatus(401).json("unauthorized");
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err || !user) {
      res.status(403).send("Forbidden");
      return;
    }

    (req as ModifiedReq).decoded = { username: user.username, role: user.role };
    next();
  });
};

export const userInfo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();
  // Can add user info if required
};
