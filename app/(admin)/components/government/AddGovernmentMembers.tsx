'use client';
import React, { useState } from 'react';
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
import Loader from '../Loader';
import { useCreateGovernmentMutation } from '@/redux/services/government/government-api';
import { showToast } from '@/lib/showToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LegislativeCard from './LegislativeCard';
import { IoAddCircle } from 'react-icons/io5';
import { CldUploadWidget } from 'next-cloudinary';
import { UploadCloud } from 'lucide-react';

const FormSchema = z.object({
  name: z.string(),
  image: z.string(),
  role: z.string(),
  lga: z.string(),
  email: z.string(),
  type: z.string(),
  start: z.date({
    required_error: 'Start date is required.',
  }),
});

const AddGovernmentMembers = ({
  onGovernmentCreated,
}: {
  onGovernmentCreated: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const [createGovernment, { isLoading }] = useCreateGovernmentMutation();

  const handleSubmit = async () => {
    try {
      // await createGovernment(newGovernment).unwrap();
      showToast('success', <p>Government official added successfully</p>);

      onGovernmentCreated();
    } catch (error) {
      console.error('Failed to create government member:', error);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      image: '',
      role: '',
      lga: '',
      email: '',
      type: '',
      start: new Date(Date.now()),
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)} className=' cursor-pointer'>
          <IoAddCircle size={50} color='green' />
        </div>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[625px]'
        onInteractOutside={(event) => event.preventDefault()}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8 w-full'
          >
            <DialogHeader>
              <DialogTitle>Create Government</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col w-full gap-4'>
              <div className='flex  w-full gap-x-4'>
                <div className='w-[250px]'>
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <CldUploadWidget
                            onSuccess={(result, { widget }) => {
                              field.onChange((result?.info! as any).secure_url); // { public_id, secure_url, etc }
                              widget.close();
                            }}
                            uploadPreset='mymakaranta_preset'
                          >
                            {({ open }) => {
                              function handleOnClick() {
                                // field.onChange(undefined);
                                open();
                              }
                              return (
                                <div
                                  onClick={handleOnClick}
                                  className='flex justify-center h-[250px] border-2 border-dashed cursor-pointer  items-center w-[180px] rounded-md relative  overflow-clip'
                                >
                                  {field.value === '' ? (
                                    <div className='flex flex-col justify-center items-center gap-2 '>
                                      <UploadCloud />
                                      <h1>Upload image</h1>
                                    </div>
                                  ) : (
                                    <Image
                                      src={field.value}
                                      alt='images'
                                      fill
                                    />
                                  )}
                                </div>
                              );
                            }}
                          </CldUploadWidget>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex flex-col space-y-6 w-full'>
                <div className='flex space-x-3 w-full items-center'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className=' w-full'>
                        <FormLabel>Goverment Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter Government title'
                            className=' w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className=' w-full'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Email'
                            className=' w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex space-x-3 w-full items-center'>
                  <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem className=' w-full'>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Role'
                            className=' w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lga'
                    render={({ field }) => (
                      <FormItem className=' w-full'>
                        <FormLabel>L.G.A</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='L.G.A'
                            className=' w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex space-x-3 w-full items-center'>
                  <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                      <FormItem className=' w-full'>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Type'
                            className=' w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='start'
                    render={({ field }) => (
                      <FormItem className='flex flex-col w-full gap-2'>
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              // disabled={(date) =>
                              //   date > new Date() || date < new Date('1900-01-01')
                              // }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? <Loader /> : 'Create Government'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGovernmentMembers;
