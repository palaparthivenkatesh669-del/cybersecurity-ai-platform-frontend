import { z } from 'zod';

// Email validation
const emailSchema = z.string().email('Invalid email address');

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Login form validation
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

// Register form validation
export const registerFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Forgot password validation
export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

// Reset password validation
export const resetPasswordFormSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Alert form validation
export const alertFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['open', 'acknowledged', 'resolved']),
});

// Search form validation
export const searchFormSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['events', 'alerts', 'threats', 'all']),
  severity: z.enum(['all', 'low', 'medium', 'high', 'critical']).optional(),
  status: z.string().optional(),
});

// Export types
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;
export type AlertFormData = z.infer<typeof alertFormSchema>;
export type SearchFormData = z.infer<typeof searchFormSchema>;
