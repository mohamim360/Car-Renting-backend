import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RentController } from "./rent.controller";
import {
  createRentValidationSchema,
  updateRentValidationSchema,
} from "./rent.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/userUtils";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(createRentValidationSchema),
  RentController.createRent
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateRentValidationSchema),
  RentController.updateRentById
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentController.deleteRentById
);

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.driver),
  RentController.getAllRents
);

router.get(
  "/user/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentController.getRentsByUserId
);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.driver),
  RentController.findRentById
);

export const RentRoutes = router;