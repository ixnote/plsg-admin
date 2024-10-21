'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import logo from '@/public/assets/logo.png';
import logo1 from '@/public/assets/logo1.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForgotPasswordMutation } from '@/redux/services/auth/auth-api';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/showToast';
import Loader from '@/app/(admin)/components/Loader';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({
    message: 'A valid email is required.',
  }),
});

const ForgotPassword = () => {
  const { push } = useRouter();
  const [forgotPassword, { data, isError, isLoading, isSuccess }] = useForgotPasswordMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await forgotPassword(values).unwrap();
      showToast('success', <p>{result.message}</p>);
      push('/login');
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  }

  return (
    <div className='flex flex-col w-full h-full gap-10 '>
      <div className='flex w-full justify-between'>
        <div className='relative w-20 h-20'>
          <Image src={logo} alt='' fill />
        </div>
        <div className='relative w-20 h-20'>
          <Image src={logo1} alt='' fill />
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-sm text-green-700 font-medium'>
            Forgot Password?
          </h1>
          <h2 className=' text-3xl font-bold '>Submit your email to reset your password.</h2>
        </div>
        <div className='flex flex-col gap-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                {isLoading ? <Loader /> : <h1>Submit</h1>}
              </Button>
            </form>
          </Form>
        </div>

        <div className='text-green-700 cursor-pointer underline'>
          <Link className='' href='/login'>Login</Link>.
        </div>
      </div>
      <div className='flex flex-col h-full w-full justify-end'>
        <h1 className='text-xs text-gree-700'>Powered by IXNOTE@2024</h1>
      </div>
    </div>
  );
};

export default ForgotPassword;