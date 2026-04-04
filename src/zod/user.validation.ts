/* zod/user.validation.ts */

import * as z from "zod";

export const signUpSchema = z
    .object({
        name: z.string().min(2, "Full name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password is required")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password is required"),
    remember: z.boolean().optional(),
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const forgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
});