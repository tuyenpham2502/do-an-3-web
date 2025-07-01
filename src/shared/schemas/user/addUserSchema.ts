import * as z from 'zod';

export const addUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(2, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
});

export type AddUserSchema = z.infer<typeof addUserSchema>;
