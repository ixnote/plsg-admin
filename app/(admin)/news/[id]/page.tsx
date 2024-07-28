'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetOneNewsQuery,
  usePublishNewsMutation,
  useUpdateNewsMutation,
} from '@/redux/services/news/news-api';
import { ArrowLeftIcon } from 'lucide-react';
import NewsInfoSection from '../../components/news/NewsInfoSection';
import SectionInfoSection from '../../components/news/SectionInfoSection';
import { Button } from '@/components/ui/button';
import Loader from '../../components/Loader';
import { useGetAllTagsQuery } from '@/redux/services/tags/tags-api';
import { showToast } from '@/lib/showToast';

const UpdateNews = () => {
  const params = useParams();
  const router = useRouter();
  const {
    data: tags,
    error: tagsError,
    isLoading: tagsIsLoading,
  } = useGetAllTagsQuery();

  const { data, error, isLoading } = useGetOneNewsQuery(
    { id: params.id },
    {
      skip: !params?.id,
    }
  );

  const [publishNews, { isLoading: updateIsLoadig }] = usePublishNewsMutation();

  const handleGoBack = () => {
    router.back();
  };

  const handlePublishNews = async () => {
    try {
      const result = await publishNews({
        id: data.data.id,
        is_posted: !data.data.is_posted,
      }).unwrap();
      showToast('success', <p>{result?.message}</p>);
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  };

  const requiredFields = [
    data?.data?.headline,
    data?.data?.image,
    data?.data?.tags.length > 0,
    data?.data?.newsSections.length > 0,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <div className='flex w-full h-full p-6 overflow-y-scroll scrollbar-hide'>
      {isLoading ? (
        <div className='flex w-full min-h-screen pt-52 justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='flex flex-col w-full gap-6'>
          <div className='flex w-full items-center justify-between'>
            <div
              className='flex gap-3 items-center cursor-pointer'
              onClick={handleGoBack}
            >
              <ArrowLeftIcon />
              <h1 className='text-2xl font-geistsans font-semibold'>
                Update News
              </h1>
            </div>
            <div className='flex gap-3'>
              <Button
                onClick={() => {
                  window.open(`/preview/${data?.data.id}`, '_blank');
                }}
                disabled={!isCompleted}
                variant={'outline'}
              >
                Preview
              </Button>
              {data?.data?.is_posted ? (
                <Button
                  variant={'destructive'}
                  onClick={handlePublishNews}
                  className=' min-w-[150px]'
                >
                  {updateIsLoadig ? <Loader /> : 'Unpublish'}
                </Button>
              ) : (
                <Button
                  disabled={!isCompleted}
                  onClick={handlePublishNews}
                  className=' min-w-[150px]'
                >
                  {updateIsLoadig ? <Loader /> : 'Publish'}
                </Button>
              )}
            </div>
          </div>
          <p>
            Requirements - {completedFields}/{totalFields} Completed
          </p>
          <div className='flex w-full gap-3'>
            <NewsInfoSection data={data} tags={tags} />
            <SectionInfoSection data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateNews;
