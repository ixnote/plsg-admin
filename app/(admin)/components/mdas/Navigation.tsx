'use client';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';
import { cn } from '@/lib/utils';
import { setStep } from '@/redux/features/mdas/mdas-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { MDASFormSchemaType } from '@/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { step } = useAppSelector((state: RootState) => state.mdas);
  const dispatch = useAppDispatch();
  const form = useFormContext<MDASFormSchemaType>();

  async function onSubmit(payload: MDASFormSchemaType) {
    setIsLoading(true);
    // const result = await signUpAction({ ...values, ...payload });
    // if (result.success) {

    //   setValues({
    //     email: '',
    //     password: '',
    //     username: '',
    //     firstName: '',
    //     lastName: '',
    //     confirmPassword: '',
    //     otp: '',
    //   });
    //   form.reset();
    // } else {
    //   showToast('error', <p>{result.message}</p>);
    // }

    setIsLoading(false);
  }

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
          ],
          {
            shouldFocus: true,
          }
        );
        result && dispatch(setStep(2));
        break;
      case 2:
        dispatch(setStep(3));
        break;
      case 3:
        dispatch(setStep(4));
        break;
      case 4:
        dispatch(setStep(5));
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
        className={cn('block', { hidden: step >= 5 })}
        onClick={handleNextStep}
      >
        Next Step
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
