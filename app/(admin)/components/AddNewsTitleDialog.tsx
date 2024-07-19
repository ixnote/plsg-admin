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
import Loader from './Loader';

const AddNewsTitleDialog = ({ title = 'Add News' }: { title?: string }) => {
  const [inputValue, setInputValue] = useState<string>('New News Caption');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {};

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
            {isLoading ? <Loader /> : 'Add News'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewsTitleDialog;
