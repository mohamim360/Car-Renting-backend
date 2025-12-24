import z from "zod";

export const createUserValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    role: z.enum(["admin", "driver", "user"]).optional(),
    img: z.string().optional(),
    rating: z.number().optional(),
    rents: z.array(z.string()).optional(),
  }),
});

export const UserValidations = {
	createUserValidation
}