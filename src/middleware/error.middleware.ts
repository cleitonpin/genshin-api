import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction): void {

    if (err instanceof HttpException) {
        res.status(err.status).json({
            message: err.message
        })
    } else {
        const status = 500;
        const message = 'Something went wrong';

        res.status(status).send({ status, message })
    }
}

export default errorMiddleware;
