import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
