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
import {
  useChangePasswordMutation,
} from '@/redux/services/auth/auth-api';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/showToast';
import Loader from '@/app/(admin)/components/Loader';
import { useAppDispatch } from '@/redux/hook';
import { logout } from '@/redux/features/auth/auth-slice';

const formSchema = z
  .object({
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be valid",
      message: 'Password is required'
    }),
    newPassword: z.string().min(8, {
      message: 'Valid password requires a minimun 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Valid password requires a minimun of 8 characters.',
    }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

const ChangePassword = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const [changePassword, { data, isError, isLoading, isSuccess }] =
    useChangePasswordMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await changePassword(values).unwrap();
      showToast('success', <p>{result.message}</p>);
      dispatch(logout());
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
            Reset password to your Account!
          </h1>
          <h2 className=' text-3xl font-bold '>PASSWORD CHANGE</h2>
        </div>
        <div className='flex flex-col gap-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your password'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter New password again'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter password again'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                {isLoading ? <Loader /> : <h1>Reset</h1>}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className='flex flex-col h-full w-full justify-end'>
        <h1 className='text-xs text-gree-700'>Powered by IXNOTE@2024</h1>
      </div>
    </div>
  );
};

export default ChangePassword;
