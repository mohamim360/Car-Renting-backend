import { User } from "../user/user.model";
import { IRent } from "./rent.interface";
import { Rent } from "./rent.model";

const createRent = async (rent: IRent) => {
  // Create the rent
  const newRent = await Rent.create(rent);
  
  // Update the user's rents array
  await User.findByIdAndUpdate(
    rent.user,
    { $push: { rents: newRent._id } },
    { new: true }
  );
  
  return newRent;
};

const updateRentById = async (rentId: string, payload: Partial<IRent>) => {
  const result = await Rent.findByIdAndUpdate(
    {
      _id: rentId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).populate("user").populate("car").populate("driver");
  
  return result;
};

const deleteRentById = async (rentId: string) => {
  // Get the rent first to find the user
  const rent = await Rent.findById(rentId);
  
  if (rent) {
    // Remove the rent from user's rents array
    await User.findByIdAndUpdate(
      rent.user,
      { $pull: { rents: rentId } },
      { new: true }
    );
  }
  
  // Delete the rent
  const result = await Rent.findByIdAndDelete(rentId);
  return result;
};

const findRentById = async (rentId: string) => {
  return await Rent.findById(rentId)
    .populate("user")
    .populate("car")
    .populate("driver");
};

const getAllRents = async () => {
  return await Rent.find()
    .populate("user")
    .populate("car")
    .populate("driver");
};

const getRentsByUserId = async (userId: string) => {
  return await Rent.find({ user: userId })
    .populate("car")
    .populate("user")
    .populate("driver");
};

export const RentService = {
  createRent,
  updateRentById,
  deleteRentById,
  findRentById,
  getAllRents,
  getRentsByUserId,
};