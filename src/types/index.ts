import type { z } from 'zod';
import type { loginSchema, registerSchema } from '@/lib/schemas';

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
