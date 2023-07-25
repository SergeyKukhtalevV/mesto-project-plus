import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { ExpandedRequest } from "./cards";
import { CustomError } from "../errors/CustomError";

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId).orFail(() => CustomError.notFoundError())
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === "CastError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const patchAboutUser = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  const userId = req.user?._id;
  User.findOneAndUpdate(
    { userId },
    {
      name,
      about,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updateUser) => {
      if (!updateUser) {
        throw CustomError.notFoundError();
      }
      res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const patchAvatarUser = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;
  User.findOneAndUpdate(
    { userId },
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updateUser) => {
      if (!updateUser) {
        throw CustomError.notFoundError();
      }
      res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};
