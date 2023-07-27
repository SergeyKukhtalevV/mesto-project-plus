import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  putLikeCard,
  removedLikeCard,
} from "../controllers/cards";
import { cardValidation, createCardValidation } from "../middleware/validationMiddleware";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCardValidation, createCard);
cardsRouter.delete("/:cardId", cardValidation, deleteCard);
cardsRouter.put("/:cardId/likes", cardValidation, putLikeCard);
cardsRouter.delete("/:cardId/likes", cardValidation, removedLikeCard);

export default cardsRouter;
