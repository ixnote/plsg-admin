'use client';

import React, { useState, useEffect } from 'react';
import UpdateExecutivesForm from '@/app/(admin)/components/government/UpdateExecutivesForm';
import UpdateMembersForm from '@/app/(admin)/components/government/UpdateMembersForm';
import UpdateOtherInfo from '@/app/(admin)/components/government/UpdateOtherInFo';
import { Button } from '@/components/ui/button';
import {
    useGetAGovernmentQuery,
    useUpdateGovernmentMutation,
} from '@/redux/services/government/government-api';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/showToast';

const UpdateGovernment = ({ params }: any) => {
    const router = useRouter();
    const { data } = useGetAGovernmentQuery({ governmentId: params?.id });
    const [members, setMembers] = useState<any>([]);
    const [executives, setExecutives] = useState([]);
    const [otherInfo, setOtherInfo] = useState<any>({});

    const [updateGovernment, { isLoading }] = useUpdateGovernmentMutation();

    useEffect(() => {
        if (data) {
            setMembers(data?.data?.members || []);
            setExecutives(data?.data?.executives || []);
            setOtherInfo(data?.data || {});
        }
    }, [data]);

    const handleGoBack = () => {
        router.back();
    };

    const handleUpdate = async () => {
        try {
            const { name, role, image, biography } = otherInfo;
            const updatedData = {
                name,
                role,
                image,
                biography,
                members,
                executives,
            };

            await updateGovernment({ id: params?.id, updatedData }).unwrap();
            showToast('success', <p>Government updated successfully</p>);
            console.log('Updated data:', updatedData);
        } catch (error) {
            console.error('Failed to create government member:', error);
        }
    };

    return (
        <div className='flex flex-col  gap-10 h-full p-10'>
            <div className='flex flex-col gap-4'>
                <div className='flex w-full items-center justify-between'>
                    <div
                        className='flex gap-3 items-center cursor-pointer'
                        onClick={handleGoBack}
                    >
                        <ArrowLeftIcon />
                        <h1 className='text-2xl font-geistsans font-semibold'>
                            Update Government
                        </h1>
                    </div>
                </div>

                <div className='w-full mb-8'>
                    <div className='flex flex-col gap-2 mt-5'>
                        <div className='w-full flex items-center justify-between'>
                            <h1 className='text-xl font-geistsans font-semibold'>
                                Update General Info
                            </h1>
                        </div>
                        <UpdateOtherInfo
                            setOtherInfo={setOtherInfo}
                            initialData={data?.data}
                        />
                    </div>

                    <div className='flex flex-col gap-2 mt-5'>
                        <div className='w-full flex items-center justify-between'>
                            <h1 className='text-xl font-geistsans font-semibold'>
                                Update Members
                            </h1>
                        </div>
                        <UpdateMembersForm
                            setMembers={setMembers}
                            initialMembers={members}
                        />
                    </div>

                    <div className='flex flex-col gap-2 mt-5'>
                        <div className='w-full flex items-center justify-between'>
                            <h1 className='text-xl font-geistsans font-semibold'>
                                Update Executives
                            </h1>
                        </div>
                        <UpdateExecutivesForm
                            setExecutives={setExecutives}
                            initialExecutives={executives}
                        />
                    </div>

                    <div className='flex flex-col gap-2 mt-5'>
                        <Button className='w-full sm:w-fit' onClick={handleUpdate}>
                            Update Government
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateGovernment;
