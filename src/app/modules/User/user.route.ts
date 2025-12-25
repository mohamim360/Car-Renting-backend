import express from "express";
import { UserController } from "./user.controller";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser
);

router.patch(
  "/:id",
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUserById
);

router.delete("/:id", UserController.deleteUserById);

router.get("/:id", UserController.findUserById);

export const UserRoutes = router;
