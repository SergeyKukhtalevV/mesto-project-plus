import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import errorMiddleware from "./middleware/errorMiddleware";
import { createUser, login } from "./controllers/users";
import auth from "./middleware/auth";
import { requestLogger, errorLogger } from "./middleware/logger";

const { PORT = 3000 } = process.env;

// eslint-disable-next-line linebreak-style
const app = express();
mongoose.connect("mongodb://0.0.0.0:27017/mestodb");
app.use(express.json());
app.use(requestLogger); // подключаем логер запросов
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth as express.NextFunction);
app.use(router);
app.use(errorLogger); // подключаем логер ошибок
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
