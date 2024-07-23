import { cn } from '@/utils';
import React from 'react';

type StepperIndicatorProps = {
  step: number;
  currentStep: number;
  title: string;
  onClick: () => void;
  completed?: boolean;
};

const StepperIndicator = ({
  step,
  title,
  currentStep,
  onClick,
  completed = false,
}: StepperIndicatorProps) => {
  return (
    <li
      className={cn(
        'flex md:w-full items-center text-xs text-gray-600 after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 hover:text-green-600 cursor-pointer',
        completed && 'text-green-600 cursor-default',
        step === currentStep && 'text-red-500'
      )}
      onClick={onClick}
    >
      <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
        <span
          className={cn(
            'w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10 hover:bg-green-600 hover:border-green-200 hover:text-white cursor-pointer',
            completed &&
              'bg-green-600 border-green-200 text-white cursor-default',
            step === currentStep && ' border border-red-500'
          )}
        >
          {step}
        </span>
        {title}
      </div>
    </li>
  );
};

export default StepperIndicator;
