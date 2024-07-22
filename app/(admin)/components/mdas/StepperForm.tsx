'use client';
import {
  getDefaultMDASFormSchemaValue,
  MDASFormSchema,
  MDASFormSchemaType,
} from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import StepperIndicator from './StepperIndicator';
import { cn } from '@/utils';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import MDASInfoForm from './MDASInfoForm';
import MDASDirectorForm from './MDASDirectorForm';
import MDASHeroForm from './MDASHeroForm';
import MDASTeamForm from './MDASTeamForm';
import Navigation from './Navigation';
import MDASContactForm from './MDASContactForm';

const StepperFormPage = () => {
  const form = useForm<MDASFormSchemaType>({
    resolver: zodResolver(MDASFormSchema),
    defaultValues: getDefaultMDASFormSchemaValue({}),
  });

  const { step } = useAppSelector((state: RootState) => state.mdas);
  return (
    <div className='flex w-full p-0 relative'>
      <div className='flex flex-col w-full'>
        <ol className='flex items-center w-full text-sm text-gray-500 font-medium sm:text-base mb-12'>
          <StepperIndicator
            step={1}
            title='MDAS Information'
            currentStep={step}
            completed={true}
          />
          <StepperIndicator step={2} title='Director' currentStep={step} />
          <StepperIndicator step={3} title='Contact' currentStep={step} />
          <StepperIndicator step={4} title='Page Header' currentStep={step} />
          <StepperIndicator step={5} title='MDAS Team' currentStep={step} />
        </ol>
        <div className='flex flex-col w-full'>
          <Form {...form}>
            <form className='flex flex-col w-full'>
              <div className={cn('hidden', { block: step === 1 })}>
                <FormProvider {...form}>
                  <MDASInfoForm />
                </FormProvider>
              </div>
              <div className={cn('hidden', { block: step === 2 })}>
                <FormProvider {...form}>
                  <MDASDirectorForm />
                </FormProvider>
              </div>
              <div className={cn('hidden', { block: step === 3 })}>
                <FormProvider {...form}>
                  <MDASContactForm />
                </FormProvider>
              </div>
              <div className={cn('hidden', { block: step === 4 })}>
                <FormProvider {...form}>
                  <MDASHeroForm />
                </FormProvider>
              </div>
              <div className={cn('hidden', { block: step === 5 })}>
                <FormProvider {...form}>
                  <MDASTeamForm />
                </FormProvider>
              </div>
            </form>
          </Form>
        </div>
        <Form {...form}>
          <FormProvider {...form}>
            <Navigation />
          </FormProvider>
        </Form>
      </div>
    </div>
  );
};

export default StepperFormPage;
