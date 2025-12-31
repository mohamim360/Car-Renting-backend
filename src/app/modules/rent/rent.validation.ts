import { z } from 'zod';

export const createRentValidationSchema = z.object({
  body: z.object({
    user: z.string(), 
    car: z.string(), 
    driver: z.string().optional(),
    startingPoint: z.string(),
    destination: z.string(),
  }),
});

export const updateRentValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    driver: z.string().optional(),
    car: z.string().optional(),
    rentStatus: z.enum(['pending', 'ongoing', 'completed']).optional(),
    startingPoint: z.string().optional(),
    destination: z.string().optional(),
  }),
});

export const RentValidations = {
  createRentValidationSchema,
  updateRentValidationSchema,
};
