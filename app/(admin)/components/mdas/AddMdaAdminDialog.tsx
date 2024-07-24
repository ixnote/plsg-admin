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
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/showToast';
import Loader from '../Loader';

import { useCreateMdaMutation } from '@/redux/services/mdas/mdas-api';

const AddMdaAdminDialog = () => {
  const [createMda, { data, isError, isLoading, isSuccess }] =
    useCreateMdaMutation();

  // const handleSubmit = async () => {
  //   try {
  //     console.log("🚀 ~ AddMdaTitleDialog ~ inputValue:", inputValue);

  //     const result = await createMda({ name: inputValue }).unwrap();
  //     console.log(result);
  //     showToast("success", <p>{result?.message}</p>);
  //     push(`/mdas/${result?.data?.id || "1"}`);
  //   } catch (error: any) {
  //     showToast("error", <p>{error.data.message}</p>);
  //   }
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className='w-full sm:w-fit'>
          Add admin
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>MDA caption</DialogTitle>
        </DialogHeader>
        <div className='flex w-full'></div>
        <DialogFooter>
          <Button type='submit'>{isLoading ? <Loader /> : 'Create MDA'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMdaAdminDialog;
