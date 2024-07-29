'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { UploadCloud } from 'lucide-react';
import { useUpdateNewsMutation } from '@/redux/services/news/news-api';
import { showToast } from '@/lib/showToast';
import Loader from '../Loader';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  headline: z.string().min(2),
  description: z.string().min(20),
  image: z.string(),
  tags: z.array(z.string()),
});

type NewsInfoSectionProps = {
  data: any;
  tags: any;
};

const NewsInfoSection = ({ data, tags }: NewsInfoSectionProps) => {
  const [isEditting, setIsEditing] = useState(false);
  const [updateNews, { isError, isLoading, isSuccess }] =
    useUpdateNewsMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: data?.data.headline ?? '',
      description: data?.data.description ?? '',
      tags: data?.data.tags.map((tag: any) => tag.id) ?? [],
      image: data?.data?.image ?? '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const result = await updateNews({ id: data.data.id, ...values }).unwrap();
      showToast('success', <p>{result?.message}</p>);
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  }
  return (
    <div className='flex flex-col w-1/2 rounded-xl border bg-card text-card-foreground shadow p-6 gap-3 mb-10 h-fit'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-semibold tracking-tight text-xl'>
          News Information
        </h1>
        <p>This information is display on the page.</p>
      </div>
      <div className='w-full '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='headline'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter headline here'
                      {...field}
                      readOnly={!isEditting}
                      disabled={!isEditting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter description here'
                      className='resize-none'
                      {...field}
                      readOnly={!isEditting}
                      disabled={!isEditting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    {/* <Input placeholder='Enter headline here' {...field} /> */}
                    <div className='flex w-full flex-wrap'>
                      <ToggleGroup
                        type='multiple'
                        defaultValue={field.value}
                        disabled={!isEditting}
                        onValueChange={(v) => {
                          field.onChange(v);
                        }}
                        className='flex w-full justify-start flex-wrap'
                      >
                        {tags?.data?.map((tag: any, index: number) => (
                          <ToggleGroupItem value={tag.id} key={index}>
                            {tag.name}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                          if (isEditting) {
                            field.onChange(undefined);
                            open();
                          }
                        }
                        return (
                          <div
                            onClick={handleOnClick}
                            className='flex justify-center h-[250px] border border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip'
                          >
                            {field.value === '' ? (
                              <div className='flex flex-col justify-center items-center gap-2 '>
                                <UploadCloud />
                                <h1>Upload image</h1>
                              </div>
                            ) : (
                              <Image src={field.value} alt='images' fill />
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
            {isEditting ? (
              <div className='flex w-full justify-between'>
                <Button
                  variant={'outline'}
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' className=' min-w-[200px]'>
                  {isLoading ? <Loader /> : ' Update News'}
                </Button>
              </div>
            ) : (
              <Button
                className='w-full'
                variant={'destructive'}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit News
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewsInfoSection;
