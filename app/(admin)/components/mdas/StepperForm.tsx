'use client';
import {
  getDefaultMDASFormSchemaValue,
  MDASFormSchema,
  MDASFormSchemaType,
} from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Form, useForm } from 'react-hook-form';
import StepperIndicator from './StepperIndicator';
import { Button } from '@/components/ui/button';

const StepperForm = () => {
  const form = useForm<MDASFormSchemaType>({
    resolver: zodResolver(MDASFormSchema),
    defaultValues: getDefaultMDASFormSchemaValue({}),
  });

  return (
    <div className='flex flex-col w-full'>
      <ol className='flex items-center w-full text-sm text-gray-500 font-medium sm:text-base mb-12'>
        <StepperIndicator step={1} title='MDAS Information' completed={true} />
        <StepperIndicator step={2} title='Director' />
        <StepperIndicator step={3} title='Contact' />
        <StepperIndicator step={4} title='Page Header' />
        <StepperIndicator step={5} title='MDAS Team' />
      </ol>
      <div className='flex flex-col'>
        <Form {...form}>
          <form>
            <div className='flex gap-x-6 mb-6'>
              <div className='w-full relative'>
                <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>
                  First Name{' '}
                  <svg
                    width='7'
                    height='7'
                    className='ml-1'
                    viewBox='0 0 7 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z'
                      fill='#EF4444'
                    />
                  </svg>
                </label>
                <input
                  type='text'
                  id='default-search'
                  className='block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none '
                  placeholder=''
                />
              </div>
              <div className='w-full relative'>
                <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>
                  Last Name{' '}
                  <svg
                    width='7'
                    height='7'
                    className='ml-1'
                    viewBox='0 0 7 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z'
                      fill='#EF4444'
                    />
                  </svg>
                </label>
                <input
                  type='text'
                  id='default-search'
                  className='block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none '
                  placeholder=''
                />
              </div>
            </div>
            <div className='relative mb-6'>
              <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>
                Email Address{' '}
                <svg
                  width='7'
                  height='7'
                  className='ml-1'
                  viewBox='0 0 7 7'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z'
                    fill='#EF4444'
                  />
                </svg>
              </label>
              <input
                type='text'
                id='default-search'
                className='block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none '
                placeholder=''
              />
            </div>
            <div className='flex gap-x-6 mb-6'>
              <div className='w-full relative'>
                <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>
                  DOB{' '}
                  <svg
                    width='7'
                    height='7'
                    className='ml-1'
                    viewBox='0 0 7 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z'
                      fill='#EF4444'
                    />
                  </svg>
                </label>
                <input
                  type='text'
                  id='default-search'
                  className='block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none '
                  placeholder=''
                />
              </div>
              <div className='w-full relative'>
                <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>
                  Country{' '}
                  <svg
                    width='7'
                    height='7'
                    className='ml-1'
                    viewBox='0 0 7 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z'
                      fill='#EF4444'
                    />
                  </svg>
                </label>
                <input
                  type='text'
                  id='default-search'
                  className='block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none '
                  placeholder=''
                />
              </div>
            </div>
            <div className='relative mb-6'>
              <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>
                Phone Number{' '}
                <svg
                  width='7'
                  height='7'
                  className='ml-1'
                  viewBox='0 0 7 7'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z'
                    fill='#EF4444'
                  />
                </svg>
              </label>
              <input
                type='text'
                id='default-search'
                className='block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none '
                placeholder=''
              />
            </div>
            <Button className=' min-w-32 text-white text-base font-semibold leading-7'>
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepperForm;
