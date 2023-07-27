import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import CustomError from "../errors/CustomError";

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) =>
    Promise<mongoose.Document<unknown, any, IUser>>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      match: /^https?:\/\/.+/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false },
);
userSchema.static("findUserByCredentials", function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(CustomError.notAuthorization());
      }

      return bcrypt.compare(password, user.password)
        .then((matched: boolean) => {
          if (!matched) {
            return Promise.reject(CustomError.notAuthorization());
          }

          return user; // теперь user доступен
        });
    });
});
export default mongoose.model<IUser, UserModel>("user", userSchema);
