import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: string,
  iart: Number,
  exp: number
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  {
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    const token = authorization.replace('Bearer', '').trim();

    if (!token) {
      return res.status(401).json({
        message: 'Token no provided'
      })
    }
    try {
      const data = jwt.verify(token, process.env.APP_SECRET);

      const { id } = data as ITokenPayload;

      req.userId = id;

      return next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token invalid!'
      });
    }
  }
}