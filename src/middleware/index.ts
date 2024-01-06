import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";

export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {

  const token = req.headers.authorization;
  // verify the token

  if (!token) {
    return res.status(401).json('Invalid token')
  }

  try {
    res.tokenData = jwt.verify(token, process.env.SECRET_KEY as Secret);
    next();
  } catch (error) {
    return res.status(401).json('Invalid token')
  }
}
