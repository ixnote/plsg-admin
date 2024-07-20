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

import { useCreateNewsMutation } from '@/redux/services/news/news-api';

const AddNewsTitleDialog = ({ title = 'Create News' }: { title?: string }) => {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<string>('New News Caption');

  const [createNews, { data, isError, isLoading, isSuccess }] =
    useCreateNewsMutation();

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const result = await createNews({ headline: inputValue }).unwrap();
      console.log(result);
      showToast('success', <p>{result?.message}</p>);
      push(`/news/${result.data.id}`);
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-fit'>{title}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>News caption</DialogTitle>
        </DialogHeader>
        <div className='flex w-full'>
          <Input
            placeholder='News Caption'
            className='w-full'
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            disabled={inputValue === '' || inputValue.length < 6}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader /> : 'Create News'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewsTitleDialog;
