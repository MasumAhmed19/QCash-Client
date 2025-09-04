import { z } from "zod";


export const updateUserZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email format").optional(),
  picture: z.url("Invalid URL format").optional(),
  nidNumber: z.string().min(5, "NID number is too short").optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
});
