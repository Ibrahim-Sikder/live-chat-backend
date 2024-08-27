import { z } from 'zod';

export const messageSchema = z.object({
  body: z.object({
    sender: z.string().uuid(),
    content: z.string().trim().min(1, 'Content cannot be empty'),
    chat: z.string().uuid(),
    readBy: z.array(z.string().uuid()).optional(),
  }),
});

export const messageValidations = {
  messageSchema,
};
