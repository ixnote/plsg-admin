import React from 'react';
import { IoAddCircle } from 'react-icons/io5';
import AddGovernmentMembers from './AddGovernmentMembers';

const LegislativeCard = () => {
  return (
    <div className='flex flex-shrink-0 justify-center items-center w-[230px] h-[300px] border rounded-lg'>
      <AddGovernmentMembers onGovernmentCreated={() => {}} />
    </div>
  );
};

export default LegislativeCard;
