import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: "Произошла ошибка получения информации о пользователях" }));

export const getUserById = (req: Request, res: Response) => User.findById(req.params.userId)
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: "Произошла ошибка. ID пользователя не найден" }));

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({
      name, about, avatar, _id: user._id,
    }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка при создании пользователя." }));
};
