import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { CustomError } from "../errors/CustomError";

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
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((result) => {
      if (result) {
        res.send({
          message: "Карточка удалена",
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(CustomError.notFoundError());
      } else {
        next(err);
      }
    });
};

export const putLikeCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw CustomError.notFoundError();
      }
      res.send({
        message: "Добавлен лайк карточке",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};

export const removedLikeCard = (req: ExpandedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-ignore
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw CustomError.notFoundError();
      }
      res.send({
        message: "Удален лайк карточки",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(CustomError.incorrectRequest());
      } else {
        next(err);
      }
    });
};
