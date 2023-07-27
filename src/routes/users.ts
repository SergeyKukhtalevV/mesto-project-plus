import { Router } from "express";

import {
  getUsers,
  getUserById,
  patchAboutUser,
  patchAvatarUser,
} from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.get("/me", getUserById);
usersRouter.patch("/me", patchAboutUser);
usersRouter.patch("/me/avatar", patchAvatarUser);

export default usersRouter;
