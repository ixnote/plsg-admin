'use client';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';
import { cn } from '@/lib/utils';
import { setStep } from '@/redux/features/mdas/mdas-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useUpdateMdaMutation } from '@/redux/services/mdas/mdas-api';
import { RootState } from '@/redux/store';
import { MDASFormSchemaType } from '@/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from '../Loader';

type NavigationProps = {
  data: any;
};

const Navigation = ({ data }: NavigationProps) => {
  const { step } = useAppSelector((state: RootState) => state.mdas);
  const dispatch = useAppDispatch();
  const form = useFormContext<MDASFormSchemaType>();

  const [updateMDA, { isError, isLoading, isSuccess }] = useUpdateMdaMutation();

  const handleSubmit = async (data: any) => {
    try {
      const result = await updateMDA(data).unwrap();
      showToast('success', <p>{result?.message}</p>);
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  };

  async function handleNextStep() {
    switch (step) {
      case 1:
        const result = await form.trigger(
          [
            'name',
            'about.title',
            'about.description',
            'about.vision',
            'about.mission',
            'about.image',
          ],
          {
            shouldFocus: true,
          }
        );
        if (result) {
          if (
            form.getFieldState('name').isDirty ||
            form.getFieldState('about.title').isDirty ||
            form.getFieldState('about.description').isDirty ||
            form.getFieldState('about.vision').isDirty ||
            form.getFieldState('about.mission').isDirty ||
            form.getFieldState('about.image').isDirty
          ) {
            const about = form.getValues('about');
            await handleSubmit({
              id: data.id,
              name: form.getValues('name'),
              about,
            });
          }
          dispatch(setStep(2));
        }
        break;
      case 2:
        const directorValidation = await form.trigger(
          [
            'director.title',
            'director.name',
            'director.position',
            'director.message',
            'director.image',
          ],
          {
            shouldFocus: true,
          }
        );
        if (directorValidation) {
          if (
            form.getFieldState('director.title').isDirty ||
            form.getFieldState('director.name').isDirty ||
            form.getFieldState('director.position').isDirty ||
            form.getFieldState('director.message').isDirty ||
            form.getFieldState('director.image').isDirty
          ) {
            const director = form.getValues('director');
            await handleSubmit({
              id: data.id,
              director,
            });
          }
          dispatch(setStep(3));
        }
        break;
      case 3:
        const contactValidation = await form.trigger(
          [
            'contact.name',
            'contact.location',
            'contact.email',
            'contact.phone',
          ],
          {
            shouldFocus: true,
          }
        );
        if (contactValidation) {
          if (
            form.getFieldState('contact.name').isDirty ||
            form.getFieldState('contact.location').isDirty ||
            form.getFieldState('contact.email').isDirty ||
            form.getFieldState('contact.phone').isDirty
          ) {
            const contact = form.getValues('contact');
            await handleSubmit({
              id: data.id,
              contact,
            });
          }
          dispatch(setStep(4));
        }

        break;
      case 4:
        const heroValidation = await form.trigger(
          ['hero.logo', 'hero.title', 'hero.description', 'hero.image'],
          {
            shouldFocus: true,
          }
        );
        if (heroValidation) {
          if (
            form.getFieldState('hero.logo').isDirty ||
            form.getFieldState('hero.title').isDirty ||
            form.getFieldState('hero.description').isDirty ||
            form.getFieldState('hero.image').isDirty
          ) {
            const hero = form.getValues('hero');

            await handleSubmit({
              id: data.id,
              hero,
            });
          }
          dispatch(setStep(5));
        }

        break;
      default:
        break;
    }
  }

  function handleBackStep() {
    if (step <= 1 || step >= 6) {
      return;
    }
    const currentStep = step;
    dispatch(setStep(currentStep - 1));
  }

  return (
    <div className='flex items-center justify-between bg-white py-5'>
      {/* the following div tag is used for proper 'justify-between' effect on mobile version */}
      <div className={cn('hidden', { block: step === 1 })} />

      <Button
        type='button'
        className={cn('block', { hidden: step <= 1 })}
        onClick={handleBackStep}
        variant='outline'
      >
        Go Back
      </Button>

      <Button
        type='button'
        className={cn('block min-w-[200px]', { hidden: step >= 5 })}
        onClick={handleNextStep}
      >
        {isLoading ? <Loader /> : 'Next Step'}
      </Button>

      <Button
        type='button'
        className={cn('hidden min-w-28 ', {
          ' flex justify-center items-center': step === 5,
        })}
        // onClick={form.handleSubmit(onSubmit)}
      >
        {isLoading ? <h1>Loading.....</h1> : 'Confirm'}
      </Button>
    </div>
  );
};

export default Navigation;
