import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Card from "../models/card";
import CustomError from "../errors/CustomError";

export interface ExpandedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

export const createCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const {
    name,
    link,
  } = req.body;
  const userId = req.user?._id;
  Card.create({
    name,
    link,
    owner: userId,
  })
    .then((card) => res.status(201)
      .send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.findById(req.params.cardId)
    .orFail(() => CustomError.notFoundError())
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw CustomError.forbidden();
      }
      return card.deleteOne();
    })
    .then((card) => {
      res.send({
        message: "Карточка удалена",
        data: card,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const toggleLikeCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-ignore
    req.method === "DELETE" ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw CustomError.notFoundError();
      }
      if (req.method === "DELETE") {
        res.send({
          message: "Удален лайк карточки",
        });
      } else {
        res.send({
          message: "Добавлен лайк карточке",
        });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const putLikeCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  toggleLikeCard(req, res, next);
};

export const removedLikeCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  toggleLikeCard(req, res, next);
};
