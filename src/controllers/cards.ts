import { Request, Response } from "express";
import Card from "../models/card";

export interface ExpandedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(500)
    .send({ message: "Произошла ошибка получения карточек" }));

export const createCard = (req: ExpandedRequest, res: Response) => {
  const {
    name,
    link,
    likes,
    createdAt,
  } = req.body;
  const userId = req.user?._id;
  Card.create({
    name,
    link,
    owner: userId,
    likes,
    createdAt,
  })
    .then((card) => res.send(card))
    .catch((err) => res.status(500)
      .send({ message: `Произошла ошибка создания карточки: ${err}` }));
};

export const deleteCard = (req: Request, res: Response) => Card.findByIdAndRemove(req.params.cardId)
  .then((result) => {
    if (result) {
      res.send({
        message: "Карточка удалена",
      });
    }
  })
  .catch(() => res.status(500)
    .send({ message: "Произошла ошибка при удалении карточки" }));

export const putLikeCard = (req: ExpandedRequest, res: Response) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw new Error("Ошибка при установке лайка карточке");
      }
      res.send({
        message: "Добавлен лайк карточке",
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message });
    });
};

export const removedLikeCard = (req: ExpandedRequest, res: Response) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-ignore
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw new Error("Ошибка при удалении лайка карточке");
      }
      res.send({
        message: "Удален лайк карточки",
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message });
    });
};
