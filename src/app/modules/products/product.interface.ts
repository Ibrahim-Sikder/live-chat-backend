export type Brands = ['samsun','apple','nokia']
export type Category = ['electronic','mobile','laptop']
export type Tags = ['exclusive','new_arrival','on_sale']
export type Colors = ['red','green','blue']
export type TProduct = {
  name: string;
  price: number;
  discountPrice: number;
  sku?: string;
  slug: string;
  tag: Tags[];
  brand: Brands[];
  color: Colors[];
  size: string;
  categories: Category[];
  stock: number;
  description: string;
  rating: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  isDeleted: boolean;
  active: boolean;
  image: string
};
