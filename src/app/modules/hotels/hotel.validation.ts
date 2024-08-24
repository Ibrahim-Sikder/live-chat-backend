import { z } from 'zod';

const createHotelValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    type: z.string({ required_error: 'Type is required' }),
    city: z.string({ required_error: 'City is required' }),
    address: z.string({ required_error: 'Address is required' }),
    distance: z.string({ required_error: 'Distance is required' }),
    photos: z.array(z.string()).optional(),
    title: z.string({ required_error: 'Title is required' }),
    desc: z.string({ required_error: 'Description is required' }),
    rating: z
      .number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating cannot exceed 5')
      .optional(),
    rooms: z.array(z.string()).optional(),
    cheapestPrice: z
      .number({ required_error: 'Cheapest price is required' })
      .min(0, 'Cheapest price must be a positive number'),
    featured: z.boolean().optional().default(false),
  }),
});

export const hotelValidations = {
  createHotelValidationSchema,
};
