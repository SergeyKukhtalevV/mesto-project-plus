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
  Card.create({
    name,
    link,
    owner: req.user?._id,
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
