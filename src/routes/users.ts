import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  patchAboutUser,
  patchAvatarUser,
} from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.post("/", createUser);
usersRouter.patch("/me", patchAboutUser);
usersRouter.patch("/me/avatar", patchAvatarUser);

export default usersRouter;
