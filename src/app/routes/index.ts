import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";

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
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
