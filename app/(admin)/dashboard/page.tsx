'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton';
import { useGetAdminDashboardQuery } from '@/redux/services/users/user-api';
import { UsersThree, BuildingOffice, NewspaperClipping } from '@phosphor-icons/react';

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
        {
          isLoading ? <LoadingSkeleton/> : 
            <div className='grid grid-flow-row grid-cols-3 gap-4'>
              <StatCard 
                title='USERS' 
                amount={data?.results?.users ?? ''} 
                desc= "Users in the system" 
                Icon={<UsersThree size={32} />}
              />
              <StatCard
                title='MDAS'
                amount={data?.results?.mdas ?? ''}
                desc="Mda's in the system"
                Icon={<BuildingOffice size={32} />}
              />
              <StatCard
                title='NEWS'
                amount={data?.results?.news ?? ''}
                desc="News in the system"
                Icon={<NewspaperClipping size={32} />}
              />
            </div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
