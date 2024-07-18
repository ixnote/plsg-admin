import React from 'react';
import Image from 'next/image';
import logo from '@/public/assets/logo.png';
import SideBarItem from './SideBarItem';
import { LayoutDashboard } from 'lucide-react';

const SideNavBar = () => {
  return (
    <div className=' sticky w-[250px]  h-full min-h-screen border-r-[1px]'>
      <div className='flex flex-col py-3 gap-4'>
        <div className='flex gap-2 items-center px-4 py-2'>
          <div className='relative w-10 h-10'>
            <Image src={logo} alt='' fill />
          </div>
          <h1 className='text-lg font-bold'>PLSG APP</h1>
        </div>
        <div className='flex flex-col h-full w-full py-10 gap-4'>
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
          <SideBarItem
            title='Dashboard'
            link='/dashboard'
            icon={<LayoutDashboard />}
          />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
