import bcryptJs  from 'bcryptjs';
import { IUser } from "./user.interface"
import config from '../../config';
import { User } from './user.model';

const createUser = async (user: IUser) => {
	user.password = await bcryptJs.hash(
		user.password,
		Number(config.bcrypt_salt_rounds)
	)
	return await User.create(user);
}

const updateUserById = async (userId: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserById = async (userId: string) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

const findUserById = async (userId: string) => {
  return await User.findById(userId);
};

export const UserService = {
	createUser,
  updateUserById,
  deleteUserById,
	findUserById,

}