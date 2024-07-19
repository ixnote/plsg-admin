'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SideBarItemProps = {
  link: string;
  title: string;
  icon: React.ReactNode;
  logout?: boolean;
};

const SideBarItem = ({ link, title, icon, logout }: SideBarItemProps) => {
  const pathname = usePathname();

  return (
    <Link href={link}>
      <div
        className={`transition-fx flex w-full px-4 gap-3  py-4 cursor-pointer font-medium hover:pl-8 ${
          link === pathname && `pl-8 border-r-4 border-main bg-green-100`
        } ${
          logout
            ? ` border-r-4 border-red-500 hover:bg-red-100`
            : `hover:bg-green-100`
        }`}
      >
        <span className={`${logout ? ` text-red-500` : `text-main`}`}>
          {icon}
        </span>
        {title}
      </div>
    </Link>
  );
};

export default SideBarItem;
