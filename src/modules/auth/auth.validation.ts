import { z } from "zod"

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Ensure password is at least 6 characters
})
  
  export const AuthValidation = {
    loginValidationSchema,
  }