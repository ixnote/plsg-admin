'use client';
import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Loader from '../Loader';
import { useGetAllAdminUsersQuery } from '@/redux/services/users/user-api';
import { useAssingAdminMdaMutation } from '@/redux/services/mdas/mdas-api';
import { showToast } from '@/lib/showToast';

const FormSchema = z.object({
  userId: z.string(),
});

type AddMdaAdminDialogProps = {
  data: any;
};

const AddMdaAdminDialog = ({ data: mda }: AddMdaAdminDialogProps) => {
  const [assingAdminMda, assignAdminData] = useAssingAdminMdaMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: '',
    },
  });

  const { data, isLoading, refetch } = useGetAllAdminUsersQuery();

  const onSubmit = async (data: any) => {
    try {
      const result = await assingAdminMda({
        id: mda.id,
        admin: data.userId,
      }).unwrap();
      console.log(result);
      showToast('success', <p>{result?.message}</p>);
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className='w-full sm:w-fit'>
          Add admin
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>MDA Admin</DialogTitle>
        </DialogHeader>
        {data?.data?.users && (
          <div className='flex w-full'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex w-full gap-6 flex-col'
              >
                <FormField
                  control={form.control}
                  name='userId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select MDA Admin' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.data?.users.map((user: any, index: any) => {
                            if (user.role !== 'super') {
                              return (
                                <SelectItem value={user.id} key={index}>
                                  {user.email} | {user.full_name}
                                </SelectItem>
                              );
                            }
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage MDA admins in the{' '}
                        <Link href='/user'>Users section</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className=''>
                  {assignAdminData.isLoading ? <Loader /> : 'Assign'}
                </Button>
              </form>
            </Form>
          </div>
        )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMdaAdminDialog;
