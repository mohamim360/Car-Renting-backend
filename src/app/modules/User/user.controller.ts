import  httpStatus  from 'http-status';
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req,res) => {
	const result = await UserService.createUser(req.body);
	
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "User is created successfully",
		data: result
	})
})

export const UserController = {
	createUser
}