import mongoose, { model, Schema } from "mongoose";
import { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Message = model<TMessage>("Message", messageSchema);
