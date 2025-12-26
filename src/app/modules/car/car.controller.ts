import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarService } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const result = await CarService.createCar(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car is created successfully',
    data: result,
  });
});

const updateCarById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.updateCarById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is updated successfully',
    data: result,
  });
});

const deleteCarById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.deleteCarById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is deleted successfully',
    data: result && null,
  });
});

const findCarById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.findCarById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is retrieved successfully',
    data: result,
  });
});


export const CarController = {
  createCar,
  updateCarById,
  deleteCarById,
  findCarById,
};
