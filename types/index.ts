import { z } from 'zod';

export const MDASFormSchema = z.object({
  name: z.string().min(2, { message: 'Field is required' }),
  about: z.object({
    title: z.string().min(8, { message: 'Field is required' }),
    description: z.string().min(10, { message: 'Field is required' }),
    vision: z.string().min(10, { message: 'Field is required' }),
    mission: z.string().min(10, { message: 'Field is required' }),
    image: z.string().url({ message: 'Image is required' }),
  }),
  director: z.object({
    name: z.string(),
    title: z.string(),
    message: z.string(),
    position: z.string(),
    image: z.string().url({ message: 'Image is required' }),
  }),
  contact: z.object({
    location: z.string(),
    phone_number_1: z.string(),
    phone_number_2: z.string(),
    email: z.string().email({ message: 'Email required' }),
  }),
  hero: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url({ message: 'Image is required' }),
    logo: z.string().url({ message: 'Image is required' }),
  }),
  team: z.array(
    z.object({
      name: z.string(),
      image: z.string().url({ message: 'Image is required' }),
      role: z.string(),
    })
  ),
});

export type MDASFormSchemaType = z.infer<typeof MDASFormSchema>;

export const getDefaultMDASFormSchemaValue = (data: any) => {
  const defaultMDASFormSchemaValue: MDASFormSchemaType = {
    name: data?.name ?? '',
    about: {
      title: data?.about?.title ?? '',
      description: data?.about?.description ?? '',
      vision: data?.about?.vision ?? '',
      mission: data?.about?.mission ?? '',
      image: data?.about?.image ?? '',
    },
    team: data?.team.length > 0 ? data?.team : [],
    contact: {
      location: data?.contact?.location ?? '',
      phone_number_1: data?.contact?.phone_number_1 ?? '',
      phone_number_2: data?.contact?.phone_number_2 ?? '',
      email: data?.contact?.email ?? '',
    },
    director: {
      name: data?.director?.name ?? '',
      title: data?.director?.title ?? '',
      position: data?.director?.position ?? '',
      message: data?.director?.message ?? '',
      image: data?.director?.image ?? '',
    },
    hero: {
      title: data?.hero?.title ?? '',
      description: data?.hero?.description ?? '',
      image: data?.hero?.image ?? '',
      logo: data?.hero?.logo ?? '',
    },
  };

  return defaultMDASFormSchemaValue;
};
