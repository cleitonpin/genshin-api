import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction): Response {
  console.log(err)
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message
    })
  }

  return res.status(500).send({
    message: 'Something went wrong'
  })
}

export default errorMiddleware;
