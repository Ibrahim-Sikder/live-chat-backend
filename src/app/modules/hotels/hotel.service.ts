/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchabelField } from '../blog/blog.constant';
import { THotel } from './hotel.interface';
import { Hotel } from './hotel.model';

const createHotel = async (payload: THotel) => {
  const result = await Hotel.create(payload);
  return result;
};

const getAllHotel = async (query: any) => {
  const { min, max, limit, ...others } = query;

  const minPrice = Number(min) || 1;
  const maxPrice = Number(max) || 999;
  const limitNumber = Number(limit);

  const result = await Hotel.find({
    ...others,
    cheapestPrice: { $gt: minPrice, $lt: maxPrice },
  }).limit(limitNumber);

  return result;
};
const getSingleHotel = async (id:string) => {
const result = await Hotel.findById(id)
};

export const countByCity = async (query: any): Promise<number[]> => {
  const cities = query.cities.split(',');
  const list = await Promise.all(
    cities.map((city: string) => {
      return Hotel.find({ city }).countDocuments();
    }),
  );
  return list;
};

const countByType = async () => {
  const hotelCount = await Hotel.countDocuments({ type: 'Hotel' });
  const apartmentCount = await Hotel.countDocuments({ type: 'Apartment' });
  const resortCount = await Hotel.countDocuments({ type: 'Resort' });
  const villaCount = await Hotel.countDocuments({ type: 'Villa' });
  const cabinCount = await Hotel.countDocuments({ type: 'Cabin' });

  return {
    hotel: hotelCount,
    apartment: apartmentCount,
    resort: resortCount,
    villa: villaCount,
    cabin: cabinCount,
  };
};

const getSinigleHotel = async (id: string) => {
  const result = await Hotel.findById(id);
  return result;
};
const updateHotel = async (id: string, payload: Partial<THotel>) => {
  const result = await Hotel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteHotel = async (id: string) => {
  const result = await Hotel.deleteOne({ _id: id });
  return result;
};

export const hotelServices = {
  createHotel,
  getAllHotel,
  getSinigleHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getSingleHotel
};
