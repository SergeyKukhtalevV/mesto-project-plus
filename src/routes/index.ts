import { errors } from "celebrate";
import express, { Router } from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";
import CustomError from "../errors/CustomError";
import { requestLogger } from "../middleware/logger";
import { createUserValidation, loginValidation } from "../middleware/validationMiddleware";
import { createUser, login } from "../controllers/users";
import auth from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";

const router = Router();

router.use(requestLogger); // подключаем логер запросов
router.post("/signin", loginValidation, login);
router.post("/signup", createUserValidation, createUser);
router.use(auth as express.NextFunction);

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use((req, res, next) => next(CustomError.notFoundError()));

router.use(errors());
router.use(errorMiddleware);

export default router;
