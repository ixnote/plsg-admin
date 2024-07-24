import { Button } from '@/components/ui/button';
import React from 'react';
import AddMdaAdminDialog from './AddMdaAdminDialog';

type MDASAdminProps = {
  data: any;
};

const MDASAdmin = ({ data }: MDASAdminProps) => {
  return (
    <div className='flex w-full min-h-[400px]'>
      {data?.admin ? (
        <div className='flex flex-col w-full h-full justify-center items-center'></div>
      ) : (
        <div className='flex flex-col w-full min-h-[400px] justify-center items-center gap-3'>
          <AddMdaAdminDialog />
          <h1 className=' text-gray-400'>No admin assigned to this MDA yet</h1>
        </div>
      )}
    </div>
  );
};

export default MDASAdmin;
