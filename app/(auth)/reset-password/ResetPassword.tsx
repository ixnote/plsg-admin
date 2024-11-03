'use client';
import React from 'react';
import { useEffect, useState } from 'react';
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
import { useResetPasswordMutation } from '@/redux/services/auth/auth-api';
import { useRouter as useRouterNavigation, useSearchParams } from 'next/navigation';
import { showToast } from '@/lib/showToast';
import Loader from '@/app/(admin)/components/Loader';

const formSchema = z.object({
    password: z.string({
        required_error: "Password is required",
        message: 'Password is required',
        invalid_type_error: "Password must be valid",
    }),
    confirmPassword: z.string().min(8, {
        message: 'Valid password requires a minimun of 8 characters.',
    }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'The passwords did not match',
            path: ['confirmPassword'],
        });
    }
});

const ResetPassword = () => {
    const { push } = useRouterNavigation();
    const searchParams = useSearchParams()

    const [resetPassword, { data, isError, isLoading, isSuccess }] = useResetPasswordMutation();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { password } = values;
        const email = searchParams.get('email') ?? '';
        const token = searchParams.get('token') ?? '';
        try {
            const result = await resetPassword({ password, email, token }).unwrap();

            const toastMessage = Array.isArray(result.message) ? result
                .message.map((message: string) => <p key={message}>{message}</p>) : result.message

            showToast('success', <>{toastMessage}</>);
            push('/login');
        } catch (error: any) {
            const toastMessage = Array.isArray(error.data.message) ?
                error?.data?.message?.map((message: string) => <p key={message}>{message}</p>)
                : error.data.message

            showToast('error', <>{toastMessage}</>);
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
                    <h2 className=' text-3xl font-bold '>Enter a new password to continue.</h2>
                </div>
                <div className='flex flex-col gap-10'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter a new password'
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
                                                placeholder='Confirm password'
                                                {...field}
                                                type='password'
                                            />
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
            </div>
            <div className='flex flex-col h-full w-full justify-end'>
                <h1 className='text-xs text-gree-700'>Powered by IXNOTE@2024</h1>
            </div>
        </div>
    );
};

export default ResetPassword;