import mongoose, { model, Schema } from 'mongoose';
import { TMessage } from './message.interface';

const messageSchema = new Schema<TMessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

<<<<<<< HEAD
export const Message = model<TMessage>("Message", messageSchema);

=======
export const Message = model<TMessage>('Message', messageSchema);
>>>>>>> 1323505126b31e8e74d27ccce5d8d091b2bccef8
