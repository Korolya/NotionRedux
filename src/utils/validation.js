import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "The password must contain at least 8 character(s)" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: "The password must contain at least one uppercase letter, one lowercase letter, and one digit " }),
  registrationDate: z.string()
});