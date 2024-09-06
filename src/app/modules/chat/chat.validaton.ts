import { z } from 'zod';

export const ChatSchema = z.object({
  body: z.object({
    chatName: z.string().optional(),
    isGroupChat: z.boolean().default(false),
    users: z.array(z.string()).optional(),
    latestMessage: z.string().optional(),
    groupAdmin: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});


export const chatValidations = {
    ChatSchema
}