import { Request, Response } from "express";
import User from "../models/user";
import { ExpandedRequest } from "./cards";

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500)
    .send({ message: "Произошла ошибка получения информации о пользователях" }));

export const getUserById = (req: Request, res: Response) => User.findById(req.params.userId)
  .then((users) => res.send(users))
  .catch(() => res.status(500)
    .send({ message: "Произошла ошибка. ID пользователя не найден" }));

export const createUser = (req: Request, res: Response) => {
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
    .catch((err) => res.status(500)
      .send({ message: `Произошла ошибка при создании пользователя. ${err}` }));
};

export const patchAboutUser = (req: ExpandedRequest, res: Response) => {
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
        throw new Error("Ошибка при обновлении данных о пользователе");
      }
      res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({ message: "Ошибка валидации" });
      }
      res
        .status(500)
        .send({ message: err.message });
    });
};

export const patchAvatarUser = (req: ExpandedRequest, res: Response) => {
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
        throw new Error("Ошибка при обновлении аватара пользователя");
      }
      res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({ message: "Ошибка валидации" });
      }
      res
        .status(500)
        .send({ message: err.message });
    });
};
