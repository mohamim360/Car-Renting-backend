import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { RentRoutes } from "../modules/rent/rent.route";
import { BidRoutes } from "../modules/bid/bid.route";

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/rents",
    route: RentRoutes,
  },
  {
    path: "/bids",
    route: BidRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
