import { Users } from 'lucide-react';
import React from 'react';
import StatCard from '../components/dashboard/statCard';

const Dashboard = () => {
  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-2xl font-geistsans font-semibold'>Dashboard</h1>
        <div className='grid grid-flow-row grid-cols-4 gap-4'>
          <StatCard />
          <StatCard />
          <StatCard />
          <StatCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
