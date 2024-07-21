import { z } from 'zod';

export const MDASFormSchema = z
  .object({
    username: z.string().min(2, { message: "Can't be empty" }),
    firstName: z.string().min(2, { message: "Can't be empty" }),
    lastName: z.string().min(2, { message: "Can't be empty" }),
    password: z.string().min(2, { message: "Can't be empty" }),
    confirmPassword: z.string().min(2, { message: "Can't be empty" }),
    // otp: z.string().length(6, { message: 'Can not be empty' }),
    // phone: z.string().min(10, { message: 'minimum 10 numbers' }),
    // plan: z.enum(['arcade', 'advanced', 'pro']),
    // addOns: z.array(z.string()).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export type MDASFormSchemaType = z.infer<typeof MDASFormSchema>;

export const getDefaultMDASFormSchemaValue = (data: any) => {
  const defaultMDASFormSchemaValue: MDASFormSchemaType = {
    username: data?.username ?? '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',

    // phone: '',
    // plan: 'arcade',
    // addOns: [],
  };

  return defaultMDASFormSchemaValue;
};

export const defaultMDASFormSchemaValue: MDASFormSchemaType = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',

  // phone: '',
  // plan: 'arcade',
  // addOns: [],
};
