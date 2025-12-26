import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    img: z.string().optional(),
    email: z.string().min(1, { message: 'Id is required.' }),
    password: z.string().optional(),
  }),
});

export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().optional(),
    img: z.string().optional(),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerUserValidationSchema,
};
