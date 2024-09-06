import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import { Brands, Category, Colors } from './product.constant';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },

    slug: {
      type: String,
      required: [true, 'Slug is required'],
    },
    discountPrice: {
      type: Number,
      required: [true, 'Price is required'],
    },
    sku: { type: String, required: false },
    image: { type: String, required: true },
    tag: [
      {
        type: String,
        required: [true, 'Tag is required'],
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    brand: [
      {
        type: String,
        enum: Brands,
        required: [true, 'Brand is required'],
      },
    ],
    color: [
      {
        type: String,
        enum: Colors,
        required: [true, 'Color  is required'],
      },
    ],
    size: {
      type: String,
      required: [true, 'Size is required'],
    },
    categories: [
      {
        type: String,
        enum: Category,
        required: [true, 'Categories is required'],
      },
    ],
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
    },
    meta_title: { type: String, required: false },
    meta_description: { type: String, required: false },
    meta_keywords: { type: String },
    isDeleted: { type: Boolean },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
