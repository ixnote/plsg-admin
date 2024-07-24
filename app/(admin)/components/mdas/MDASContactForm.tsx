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
                name='contact.phone_number_1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number 1</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Contact Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='contact.phone_number_2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter MDAS Location/address'
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
                name='contact.location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location/address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter MDAS Location/Address'
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
                name='contact.email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter MDAS Contact Email'
                        {...field}
                      />
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
