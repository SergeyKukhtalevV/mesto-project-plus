import mongoose, { Schema } from "mongoose";
import { urlPattern } from "../constans/patterns";

interface ICard {
  name: string;
  link: string;
  avatar: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      minlength: 2,
      maxLength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      match: urlPattern,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);
export default mongoose.model<ICard>("card", cardSchema);
