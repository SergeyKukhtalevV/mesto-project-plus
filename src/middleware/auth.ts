import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import { ExpandedRequest } from "../controllers/cards";
import CustomError from "../errors/CustomError";

export default (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(CustomError.notAuthorization());
  }

  const token = authorization?.replace("=", "");
  let payload;

  try {
    payload = jwt.verify(token!, "some-secret-key") as JwtPayload;
  } catch (err) {
    next(CustomError.notAuthorization());
  }

  req.user = {
    _id: payload?._id,
  };
  next();
};
