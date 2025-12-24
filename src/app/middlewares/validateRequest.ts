import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ZodObject } from "zod";

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsed = await schema.parseAsync({
      body: req.body,
    });

    req.body = parsed.body;

    next();
  });
};

export default validateRequest;
