import * as z from "zod";

export const updateProfileSchema = z.object({
    username : z.string().min(3, "Username must be at least 3 characters").max(8, "Username must be at most 8 characters").trim(),
    email : z.string().email("Invalid email address"),
    password : z.string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
    }),
})