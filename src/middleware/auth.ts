import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import { ExpandedRequest } from "../controllers/cards";
import CustomError from "../errors/CustomError";

const auth = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return CustomError.notAuthorization();
  }

  const token = cookie?.replace("token=", "");
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
export default auth;
