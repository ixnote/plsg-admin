'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import { useGetAdminDashboardQuery } from '@/redux/services/users/user-api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { data, isLoading } = useGetAdminDashboardQuery();

  useEffect(() => {
    setDashboardData(data);
    console.log(data);
  }, [data]);

  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-2xl font-semibold font-oswald'>Dashboard</h1>
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
