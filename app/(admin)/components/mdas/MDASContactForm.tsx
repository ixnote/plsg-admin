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

const MDASContactForm = () => {
  const form = useFormContext<MDASFormSchemaType>();

  return (
    <>
      {form && (
        <div className='flex flex-col w-full gap-6'>
          <div className='flex  w-full gap-x-4'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter MDAS Official Name'
                        {...field}
                      />
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
                name='about.title'
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
                name='about.description'
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
                name='about.vision'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vision</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter MDAS Vision' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='about.mission'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MDAs Mission</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter MDAS Mission' {...field} />
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

export default MDASContactForm;
