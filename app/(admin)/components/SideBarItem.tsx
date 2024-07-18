import React from 'react';

import Link from 'next/link';

type SideBarItemProps = {
  link: string;
  title: string;
  icon: React.ReactNode;
};

const SideBarItem = ({ link, title, icon }: SideBarItemProps) => {
  return (
    <Link href={link}>
      <div className='flex w-full px-4 gap-3 border-r-4 border-green-500 py-2 font-medium'>
        {icon}
        {title}
      </div>
    </Link>
  );
};

export default SideBarItem;
