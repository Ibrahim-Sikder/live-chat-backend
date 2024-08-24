import express from 'express';
import { validateRequest } from '../../../utils/validateRequest';
import { hotelValidations } from './hotel.validation';
import { hotelControllers } from './hotel.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(hotelValidations.createHotelValidationSchema),
  hotelControllers.createHotel,
);
router.get('/countByCity', hotelControllers.countByCity);
router.get('/', hotelControllers.getAllHotel);
router.get('/countByType', hotelControllers.countByType);
router.get('/:id', hotelControllers.getSingleHotel);
router.delete('/:id', hotelControllers.deleteHotel);
router.patch(
  '/:id',

  hotelControllers.updateHotel,
);

router.get('/countByCity', hotelControllers.countByCity);

export const hotelRoutes = router;
