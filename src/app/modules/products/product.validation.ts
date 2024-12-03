import { z } from 'zod';
import { Brands, Category, Colors, Tags } from './product.constant';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name is required ',
    }),
    price: z.number({ required_error: 'Price is required' }),
    discountPrice: z.number({ required_error: 'Price is required' }),
    sku: z.string({ required_error: 'SKU is required ' }),
    slug: z.string({ required_error: 'Slug is required ' }),
    tag: z.array(z.enum([...Tags] as [string, ...string[]])),
    brand: z.array(z.enum([...Brands] as [string, ...string[]])),
    color: z.array(z.enum([...Colors] as [string, ...string[]])),
    size: z.string({ required_error: 'Size is required ' }),
    categories: z.array(z.enum([...Category] as [string, ...string[]])),
    stock: z.number({ required_error: 'Stock  is required ' }),
    description: z.string({ required_error: 'Description is required ' }),
    rating: z.number({ required_error: 'Rating is required ' }),
    meta_title: z.string(),
    meta_description: z.string(),
    meta_keywords: z.string(),
    isDeleted: z.boolean(),
    active: z.boolean(),
  }),
});

export const ProductValidationSchema = {
  createProductValidationSchema,
};
