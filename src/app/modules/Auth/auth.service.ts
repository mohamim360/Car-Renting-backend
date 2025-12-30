import config from "../../config";
import bcryptJs from "bcryptjs";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "../../utils/authUtils";
import { USER_ROLE } from "../../utils/userUtils";
import { SignOptions } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  // check if user exists
  let user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error("User not found!");
  }

  const isPasswordMatched = await bcryptJs.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password Incorrect!");
  }


  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
    name: user.name
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions["expiresIn"]
  );

  return {
    accessToken,
    jwtPayload
  };
};

const registerUser = async (userData: TLoginUser) => {
  if (userData.password) {
    userData.password = await bcryptJs.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const user = await User.create({
    ...userData,
    role: USER_ROLE.user,
  });

  return user;
};

export const AuthServices = {
  loginUser,
  registerUser,
};
