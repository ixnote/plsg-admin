'use client';
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MDASFormSchemaType } from '@/types';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const MDASHeroForm = () => {
  const form = useFormContext<MDASFormSchemaType>();

  return (
    <>
      {form && (
        <div className='flex flex-col w-full gap-6'>
          <div className='flex  w-full gap-x-4'>
            <div className='w-[250px]'>
              <FormField
                control={form.control}
                name='hero.logo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
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
                              className='flex justify-center h-[250px] border-2 border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip'
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
            </div>
          </div>
          <div className='flex  w-full gap-x-4'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='hero.title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter The Title on MDAS Home page'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='hero.description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex  w-full gap-x-4'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='hero.image'
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
                              className='flex justify-center h-[450px] border-2 border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip'
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MDASHeroForm;
