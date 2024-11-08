'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/public/assets/logo.png';
import SideBarItem from './SideBarItem';
import {
  LayoutDashboard,
  UsersRound,
  BriefcaseBusiness,
  Newspaper,
  Handshake,
  Cog,
  LogOut,
  SquareLibrary,
  FlagIcon,
} from 'lucide-react';
import { useAppDispatch } from '@/redux/hook';
import { logout } from '@/redux/features/auth/auth-slice';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';

export const navItemsSuperAdmin = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Governments',
    link: '/governments',
    icon: <FlagIcon />,
  },
  {
    title: 'MDAs',
    link: '/mdas',
    icon: <BriefcaseBusiness />,
  },
  {
    title: 'Users',
    link: '/users',
    icon: <UsersRound />,
  },

  {
    title: 'Settings',
    link: '/settings',
    icon: <Cog />,
  },
];

export const navItemsMdaAdmin = [
  {
    title: 'Dashboard',
    link: '/mdas-dashboard',
    icon: <LayoutDashboard />,
  },
  {
    title: 'News',
    link: '/news',
    icon: <Newspaper />,
  },
  {
    title: 'Articles',
    link: '/resources',
    icon: <SquareLibrary />,
  },
];

const SideNavBar = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    push('/login');
    dispatch(logout());
    window.location.reload();
  };

  const navBar = user?.role === 'super' ? navItemsSuperAdmin : navItemsMdaAdmin;

  return (
    <div className=' sticky inset-y-0 w-[260px]  h-full border-r-[1px] '>
      <div className='flex flex-col h-screen py-3 gap-4 justify-between'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2 items-center px-4 py-2'>
            <div className='relative w-10 h-10'>
              <Image src={logo} alt='' fill />
            </div>
            <h1 className='text-lg font-bold'>PLSG APP</h1>
          </div>
          <div className='flex flex-col h-full w-full py-10 gap-4'>
            {navBar.map((nav, index) => (
              <SideBarItem
                key={index}
                title={nav.title}
                link={nav.link}
                icon={nav.icon}
              />
            ))}
          </div>
        </div>
        <span
          className='transition-fx flex w-full px-4 gap-3  py-4 cursor-pointer font-medium  border-r-4 border-red-500 hover:bg-red-100 hover:pl-8'
          onClick={() => handleLogout()}
        >
          <span className='text-red-500'>
            <LogOut />
          </span>
          Logout
        </span>
      </div>
    </div>
  );
};

export default SideNavBar;
