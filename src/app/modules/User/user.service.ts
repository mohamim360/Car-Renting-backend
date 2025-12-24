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

export const UserService = {
	createUser,
}