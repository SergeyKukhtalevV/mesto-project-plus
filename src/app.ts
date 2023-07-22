import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import { ExpandedRequest } from "./controllers/cards";
import { errorMiddleware } from "./middleware/errorMiddleware";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://0.0.0.0:27017/mestodb");
app.use(express.json());

app.use((req: ExpandedRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(router, errorMiddleware);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
