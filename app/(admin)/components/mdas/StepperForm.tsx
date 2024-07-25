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
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import MDASInfoForm from './MDASInfoForm';
import MDASDirectorForm from './MDASDirectorForm';
import MDASHeroForm from './MDASHeroForm';
import MDASTeamForm from './MDASTeamForm';
import Navigation from './Navigation';
import MDASContactForm from './MDASContactForm';
import { setStep } from '@/redux/features/mdas/mdas-slice';
import MDASAdmin from './MDASAdmin';

type StepperFormPageProps = {
  data: any;
};

const StepperFormPage = ({ data }: StepperFormPageProps) => {
  const dispatch = useAppDispatch();
  const form = useForm<MDASFormSchemaType>({
    resolver: zodResolver(MDASFormSchema),
    defaultValues: getDefaultMDASFormSchemaValue(data),
  });

  const mdaInfoRequiredFields = [
    data?.name,
    data?.abbreviation,
    data?.about?.title,
    data?.about?.description,
    data?.about?.vision,
    data?.about?.mission,
    data?.about?.image,
  ];
  const directorRequiredFields = [
    data?.director?.name,
    data?.director?.title,
    data?.director?.position,
    data?.director?.message,
    data?.director?.image,
  ];

  const contactRequiredFields = [
    data?.contact?.location,
    data?.contact?.phone_number_1,
    data?.contact?.phone_number_2,
    data?.contact?.email,
  ];

  const heroRequiredFields = [
    data?.hero?.title,
    data?.hero?.description,
    data?.hero?.image,
    data?.hero?.logo,
  ];

  const teamRequiredFields = [data?.team.length > 0];
  const adminRequiredFields = [data?.admin];

  const mdaInfoRequiredFieldsIsCompleted = mdaInfoRequiredFields.every(Boolean);
  const directorIsCompleted = directorRequiredFields.every(Boolean);
  const contactIsCompleted = contactRequiredFields.every(Boolean);
  const heroIsCompleted = heroRequiredFields.every(Boolean);
  const teamIsCompleted = teamRequiredFields.every(Boolean);
  const adminIsCompleted = adminRequiredFields.every(Boolean);

  const { step } = useAppSelector((state: RootState) => state.mdas);
  const handleClick = (step: number) => dispatch(setStep(step));
  return (
    <div className='flex w-full'>
      <div className='flex flex-col w-full'>
        <ol className='flex items-center w-full text-sm text-gray-500 font-medium sm:text-base mb-12'>
          <StepperIndicator
            step={1}
            title='MDAS Information'
            currentStep={step}
            onClick={() => {
              handleClick(1);
            }}
            completed={mdaInfoRequiredFieldsIsCompleted}
          />
          <StepperIndicator
            step={2}
            title='Director'
            currentStep={step}
            onClick={() => {
              if (mdaInfoRequiredFieldsIsCompleted) {
                handleClick(2);
              }
            }}
            completed={directorIsCompleted}
          />
          <StepperIndicator
            step={3}
            title='Contact'
            currentStep={step}
            onClick={() => {
              if (directorIsCompleted) {
                handleClick(3);
              }
            }}
            completed={contactIsCompleted}
          />
          <StepperIndicator
            step={4}
            title='Page Header'
            currentStep={step}
            onClick={() => {
              if (contactIsCompleted) {
                handleClick(4);
              }
            }}
            completed={heroIsCompleted}
          />
          <StepperIndicator
            step={5}
            title='MDAS Team'
            currentStep={step}
            completed={teamIsCompleted}
            onClick={() => {
              if (heroIsCompleted) {
                handleClick(5);
              }
            }}
          />
          <StepperIndicator
            step={6}
            title='MDAS Admin'
            currentStep={step}
            completed={adminIsCompleted}
            onClick={() => {
              if (teamIsCompleted) {
                handleClick(6);
              }
            }}
          />
        </ol>
        <div className='flex flex-col w-full'>
          <Form {...form}>
            <form className='flex flex-col w-full min-h-[300px]'>
              <div className={cn('hidden', { block: step === 1 })}>
                <FormProvider {...form}>
                  <MDASInfoForm data={data} />
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
              <div className={cn('hidden', { block: step === 6 })}>
                <FormProvider {...form}>
                  <MDASAdmin data={data} />
                </FormProvider>
              </div>
            </form>
          </Form>
        </div>
        <Form {...form}>
          <FormProvider {...form}>
            <Navigation data={data} />
          </FormProvider>
        </Form>
      </div>
    </div>
  );
};

export default StepperFormPage;
