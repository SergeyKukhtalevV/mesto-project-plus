import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  putLikeCard,
  removedLikeCard,
} from "../controllers/cards";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
cardsRouter.put("/:cardId/likes", putLikeCard);
cardsRouter.delete("/:cardId/likes", removedLikeCard);

export default cardsRouter;
