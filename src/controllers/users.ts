import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user";
import { ExpandedRequest } from "./cards";
import CustomError from "../errors/CustomError";

interface IUserData {
  name?: string;
  about?: string;
  avatar?: string;
}

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

export const getUserById = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  User.findById(req.user?._id || req.params.userId)
    .orFail(() => CustomError.notFoundError())
    .then((users) => res.send(users))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
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
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

const patchUserInfo = (
  data: IUserData,
  req: ExpandedRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  User.findOneAndUpdate(
    { userId },
    { data },
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
      if (err instanceof mongoose.Error.ValidationError) {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const patchAboutUser = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  patchUserInfo({
    name: req.body.name,
    about: req.body.about,
  }, req, res, next);
};

export const patchAvatarUser = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  patchUserInfo({
    avatar: req.body.avatar,
  }, req, res, next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, "some-secret-key", { expiresIn: "7d" });

      // вернём токен
      res.cookie("token", token, { httpOnly: true });
      res.send({ message: "Вы успешно авторизовались!" });
    })
    .catch(next);
};
