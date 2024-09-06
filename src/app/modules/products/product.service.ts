/* eslint-disable @typescript-eslint/no-explicit-any */

import { sendImageToCloudinary } from '../../../utils/sendImageToCloudinary';
import { TProduct } from './product.interface';
import { Product } from './product.model';



// const createProduct = async (file: any, payload: TProduct) => {
//   console.log(file);
//   console.log(payload);

//   if (file) {
//     const filePath = path.join(uploadsDir, file.filename);
//     await sendImageToCloudinary(file.filename, filePath);
//   }

//   const result = await Product.create(payload);
//   return result;
// };

const createProduct = async (file:any,payload: TProduct) => {
  
if(file){
  const imageName = `${payload?.name}`;
  const path = file?.path;

  //send image to cloudinary
  const { secure_url } = await sendImageToCloudinary(imageName, path);
  payload.image = secure_url as string;
}

  const result = await Product.create(payload);
  return result;
};


const getAllProduct = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProduct = async (id: string) => {
  const result = await Product.findOne({ id });
  return result;
};
const deleteProduct = async () => {
  const result = await Product.find();
  return result;
};
const updateProduct = async () => {
  const result = await Product.find();
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
