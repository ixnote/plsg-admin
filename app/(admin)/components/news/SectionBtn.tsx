import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type SectionBtnProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const SectionBtn = ({ title, icon, onClick }: SectionBtnProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className='flex w-10 h-10 rounded-md bg-white cursor-pointer justify-center items-center'
            onClick={onClick}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SectionBtn;
