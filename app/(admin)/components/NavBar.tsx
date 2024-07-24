'use client';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { User } from 'lucide-react';
import React from 'react';

const NavBar = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return (
    <div className=' ml-[220px] h-[80px] fixed inset-x-0 border-b-[1px] z-50 bg-white'>
      <div className='flex px-4 items-center h-full w-full justify-between'>
        <div className='flex items-center gap-2'>
          <h1 className=' text-xl font-semibold'>WELCOME</h1>
          <h1> {user?.full_name}</h1>
        </div>
        <div className='flex gap-3'>
          <div className='flex flex-col items-end'>
            <h1 className='font-semibold'>{user?.email}</h1>
            <h1>{user?.role}</h1>
          </div>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 border border-gray-400'>
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
