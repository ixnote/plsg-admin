import { z } from 'zod';

export const MDASFormSchema = z.object({
  name: z.string().min(2, { message: 'Field is required' }),
  about: z.object({
    title: z.string().min(8, { message: 'Field is required' }),
    description: z.string().min(10, { message: 'Field is required' }),
    vision: z.string().min(10, { message: 'Field is required' }),
    mission: z.string().min(10, { message: 'Field is required' }),
    image: z.string().min(10, { message: 'Field is required' }),
  }),
  director: z.object({
    name: z.string(),
    title: z.string(),
    position: z.string(),
    image: z.string(),
  }),
  contact: z.object({
    name: z.string(),
    location: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    logo: z.string(),
  }),
  team: z.array(
    z.object({
      name: z.string(),
      image: z.string(),
      role: z.string(),
    })
  ),
});

export type MDASFormSchemaType = z.infer<typeof MDASFormSchema>;

export const getDefaultMDASFormSchemaValue = (data: any) => {
  const defaultMDASFormSchemaValue: MDASFormSchemaType = {
    name: '',
    about: {
      title: '',
      description: '',
      vision: '',
      mission: '',
      image: '',
    },
    team: [],
    contact: {
      name: '',
      location: '',
      phone: '',
      email: '',
    },
    director: {
      name: '',
      title: '',
      position: '',
      image: '',
    },
    hero: {
      title: '',
      description: '',
      image: '',
      logo: '',
    },
  };

  return defaultMDASFormSchemaValue;
};
