import { Router } from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";
import CustomError from "../errors/CustomError";

const router = Router();

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use((req, res, next) => next(CustomError.notFoundError()));

export default router;
