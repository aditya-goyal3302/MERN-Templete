import * as z from 'zod';

export const useIdentifiedWitnessSchema = () => {
  return z.object({
    name: z.string({required_error: 'Name is required'}).min(1,{ message: "String must contain at least 1 character(s)" }),
    last_name: z.string({required_error: 'Last Name is required'}).min(1,{ message: "String must contain at least 1 character(s)" }),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    phone: z
      .string()
      .nullable()
      .optional()
      .refine((val) =>!val ||( val && /^[0-9]{0,10}$/.test(val)), {
        message: 'Phone number must be numeric and not more than 10 digits',
      }),
    city: z.any().optional(),
  });
};

export type CityOption = {
  value: string;
  label: string;
};

export type WitnessSchema = z.infer<ReturnType<typeof useIdentifiedWitnessSchema>>;
