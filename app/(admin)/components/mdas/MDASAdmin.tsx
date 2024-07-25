'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import AddMdaAdminDialog from './AddMdaAdminDialog';
import { useDisabledAdminMdaMutation } from '@/redux/services/mdas/mdas-api';
import Loader from '../Loader';
import { showToast } from '@/lib/showToast';

type MDASAdminProps = {
  data: any;
};

const MDASAdmin = ({ data }: MDASAdminProps) => {
  const [disabledAdminMda, { isLoading }] = useDisabledAdminMdaMutation();

  const handleDisableAdmin = async () => {
    try {
      const result = await disabledAdminMda({
        id: data?.id,
        admin: data?.admin,
      }).unwrap();
      console.log(result);
      //   showToast('success', <p>{result?.message}</p>);
    } catch (error: any) {
      //   showToast('error', <p>{error.data.message}</p>);
    }
  };

  return (
    <div className='flex w-full min-h-[300px]'>
      {data?.admin ? (
        <div className='flex flex-col w-full h-full justify-center items-center'>
          <div className='flex flex-col p-10 border rounded-2xl gap-6'>
            <h1 className=' font-bold text-2xl'>MDA ADMIN INFORMATION</h1>
            <div className='flex flex-col gap-2'>
              <h1>Name:{data.admin.full_name}</h1>
              <h1>Email:{data.admin.email}</h1>
              <h1>Phone:{data.admin.phone}</h1>
            </div>
            <Button variant={'destructive'} onClick={handleDisableAdmin}>
              {isLoading ? <Loader /> : 'Disable Admin'}
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full min-h-[400px] justify-center items-center gap-3'>
          <AddMdaAdminDialog data={data} />
          <h1 className=' text-gray-400'>No admin assigned to this MDA yet</h1>
        </div>
      )}
    </div>
  );
};

export default MDASAdmin;
