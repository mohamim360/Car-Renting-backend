import { ICar } from './car.interface';
import { Car } from './car.model';

const createCar = async (car: ICar) => {
  return await Car.create(car);
};

const updateCarById = async (carId: string, payload: Partial<ICar>) => {
  const result = await Car.findByIdAndUpdate({ _id: carId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCarById = async (carId: string) => {
  const result = await Car.findByIdAndDelete(carId);
  return result;
};

const findCarById = async (carId: string) => {
  return await Car.findById(carId);
};

export const CarService = {
  createCar,
  findCarById,
  updateCarById,
  deleteCarById,
};
