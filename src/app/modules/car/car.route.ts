import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarController } from './car.controller';
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from './car.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../utils/userUtils';

const router = express.Router();

router.post(
  '/',
   auth(USER_ROLE.admin),
  validateRequest(createCarValidationSchema),
  CarController.createCar,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarController.updateCarById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  CarController.deleteCarById,
);

router.get('/:id', CarController.findCarById);

export const CarRoutes = router;
