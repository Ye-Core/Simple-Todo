import * as z from "zod";

export const registerSchema = z.object({
    username : z.string().min(3, "Username must be at least 3 characters").max(8, "Username must be at most 8 characters").trim(),
    email : z.string().email("Invalid email address"),
    password : z.string().min(6, "Password must be at least 6 characters"),
})