import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentService } from "./rent.service";

const createRent = catchAsync(async (req, res) => {
  const result = await RentService.createRent(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Rent is created successfully",
    data: result,
  });
});

const updateRentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RentService.updateRentById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rent is updated successfully",
    data: result,
  });
});

const deleteRentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RentService.deleteRentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rent is deleted successfully",
    data: result && null,
  });
});

const findRentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RentService.findRentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rent is retrieved successfully",
    data: result,
  });
});

const getAllRents = catchAsync(async (req, res) => {
  const result = await RentService.getAllRents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rents are retrieved successfully",
    data: result,
  });
});

const getRentsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await RentService.getRentsByUserId(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User rents are retrieved successfully",
    data: result,
  });
});

export const RentController = {
  createRent,
  findRentById,
  updateRentById,
  deleteRentById,
  getAllRents,
  getRentsByUserId,
};