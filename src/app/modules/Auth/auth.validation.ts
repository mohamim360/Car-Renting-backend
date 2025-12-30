import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    img: z.string().optional(),
    email: z.string().min(1, { message: 'Id is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),  }),
});

export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required.' }).optional(),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string(),
    img: z.string().optional(),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerUserValidationSchema,
};
