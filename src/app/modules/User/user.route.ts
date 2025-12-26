import express from "express";
import { UserController } from "./user.controller";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/userUtils";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUserById
);

router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUserById);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.driver, USER_ROLE.user),
  UserController.findUserById
);

export const UserRoutes = router;
