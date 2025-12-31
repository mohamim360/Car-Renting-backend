import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";
import { USER_ROLE } from "../utils/userUtils";

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // checking if the token is missing
    if (!authHeader) {
      const err = new Error("You are not authorized!");
      (err as any).statusCode = httpStatus.UNAUTHORIZED;
      throw err;
    }

    // Extract token from "Bearer TOKEN" format
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    // checking if the given token is valid
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      const err = new Error("Invalid token");
      (err as any).statusCode = httpStatus.UNAUTHORIZED;
      throw err;
    }

    const { role, email } = decoded;

    // checking if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error("This user is not found!");
      (err as any).statusCode = httpStatus.NOT_FOUND;
      throw err;
    }

    // checking if the user has required role
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      const err = new Error("You are not authorized!");
      (err as any).statusCode = httpStatus.UNAUTHORIZED;
      throw err;
    }

    // attach user to request
    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
