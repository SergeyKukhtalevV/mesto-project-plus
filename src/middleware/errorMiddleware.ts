import { NextFunction, Request, Response } from "express";
import { SERVER_ERROR } from "../constans/errors";

export const errorMiddleware = (
  error: {status: number, message: string},
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status = SERVER_ERROR.status, message } = error;
  res
    .status(status)
    .send({
      message: status === SERVER_ERROR.status
        ? SERVER_ERROR.message
        : message,
    });
  next();
};
