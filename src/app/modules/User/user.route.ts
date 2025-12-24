import express from "express";
import { UserController } from "./user.controller";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(UserValidations.createUserValidation),
  UserController.createUser
);

export const UserRoutes = router;