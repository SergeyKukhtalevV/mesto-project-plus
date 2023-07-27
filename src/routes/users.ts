import { Router } from "express";

import {
  getUsers,
  getUserById,
  patchAboutUser,
  patchAvatarUser,
} from "../controllers/users";
import {
  getUserByIdValidation,
  patchAboutUserValidation, patchAvatarUserValidation,
} from "../middleware/validationMiddleware";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/me", getUserByIdValidation, getUserById);
usersRouter.get("/:userId", getUserByIdValidation, getUserById);
usersRouter.patch("/me", patchAboutUserValidation, patchAboutUser);
usersRouter.patch("/me/avatar", patchAvatarUserValidation, patchAvatarUser);

export default usersRouter;
