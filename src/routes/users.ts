import { Router } from "express";

import { getUsers, getUserById, createUser } from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.post("/", createUser);

export default usersRouter;
