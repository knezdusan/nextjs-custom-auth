import { z } from "zod";
import * as CompanyEmailValidator from 'company-email-validator';

// Database Schema and Types ------------------------

export const clientSchema = z.object({
  company: z.string().trim().min(3, 'Company name must be at least 3 characters long').max(50, 'Company name must be at most 50 characters long'),
  // status: z.enum(["ACTIVE", "INACTIVE", "TRIAL"]).default("TRIAL"),
});

export const clientSchemaDb = clientSchema.extend({
  id: z.string().cuid(),
})

export const userSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 1 characters long').max(30, 'Name must be at most 30 characters long'),
  email: z.string().trim().min(1, 'Email is required').toLowerCase()
    .email('Invalid email address. ')
    .refine((email) => {
      const host = email.split('@')[1];
      return CompanyEmailValidator.isCompanyEmail(email);
    }, {
      message: "You must provide your email that you use for your Company account. "
    }),
  password: z.string().trim().min(8, 'Password must be at least 8 characters long. ')
    .max(20, 'Password must be at most 20 characters long. ')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter. ')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter. ')
    .regex(/[0-9]/, 'Password must contain at least one number. ')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character: @$!%*?& ')
  ,
  // role: z.enum(["USER", "ADMIN", "INACTIVE"]).default("ADMIN"),
});

export const userSchemaDb = userSchema.extend({
  id: z.string().cuid(),
  clientId: z.string().cuid(),
})

// make signupFormSchema which extends userSchema and clientSchema
export const signupFormSchema = userSchema.merge(clientSchema);

// make loginFormSchema which picks only email and password from userSchema
export const loginFormSchema = userSchema.pick({ "email": true, "password": true });

export type Client = z.infer<typeof clientSchema>;
export type ClientDb = z.infer<typeof clientSchemaDb>;
export type User = z.infer<typeof userSchema>;
export type UserDb = z.infer<typeof userSchemaDb>;
export type SignupForm = z.infer<typeof signupFormSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;

export type AuthFormErrors = {
  errors: {
    email?: string[];
    password?: string[];
    name?: string[];
    company?: string[];
  }
}

export type JWTPayload = Omit<SignupForm, "password">


// Email / nodemailer types -------------------------------------------------

export type EmailData = {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export type EmailResponse = {
  message: string;
}