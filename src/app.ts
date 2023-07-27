import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import router from "./routes/index";
import errorMiddleware from "./middleware/errorMiddleware";
import { createUser, login } from "./controllers/users";
import auth from "./middleware/auth";
import { requestLogger, errorLogger } from "./middleware/logger";
import { createUserValidation, loginValidation } from "./middleware/validationMiddleware";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://0.0.0.0:27017/mestodb");
app.use(express.json());
app.use(requestLogger); // подключаем логер запросов
app.post("/signin", loginValidation, login);
app.post("/signup", createUserValidation, createUser);
app.use(auth as express.NextFunction);
app.use(router);
app.use(errorLogger); // подключаем логер ошибок
app.use(errors());
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
