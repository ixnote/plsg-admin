'use client';
import React from 'react';
import { GoHome } from 'react-icons/go';
import Image from 'next/image';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';
import { articleData } from '@/utils/mockArticle';
import ArticleImage from '@/assets/imgs/article1png.png';
import ArticleCardTwo from '@/components/ArticleCardTwo';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetOneNewsQuery } from '@/redux/services/news/news-api';
import LoadingSkeleton from '@/app/(admin)/components/dashboard/LoadingSkeleton';
import RenderNewsSection from '@/app/(admin)/components/news/RenderNewsSection';

const PreviewPage = () => {
    const params = useParams();

    const { data, error, isLoading } = useGetOneNewsQuery(
        { id: params.id },
        {
            skip: !params?.id,
        }
    );
    // const data = articleData;
    const article = {
        image: ArticleImage,
        title: 'Guide to Renewing Your Vehicle Registration',
        text: 'Learn the steps, required documents, fees, and timelines renewing your vehicle registration in Plateau State. Simplify he process with our comprehensive guide.',
    };

    const resource = {
        name: 'Name',
        description:
            '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quibusdam veniam saepe repellat aliquam beatae repellendus soluta facere pariatur consequatur at hic commodi nam error!',
        updatedAt: '21-7-2024',
    };

    return (
        <div className='pt-[100px] p-5 w-[92%] mx-auto'>
            {data?.data ? (
                <span className='max-w-[1200px] mx-auto flex flex-col'>
                    <span className='flex flex-col gap-8'>
                        <span className='uppercase text-[#00000080] opacity-80 font-light flex items-center gap-2 text-[14px] flex-wrap'>
                            <Link href={`/`}>
                                <GoHome size={18} />
                            </Link>
                            /<p>Search</p>/<p>SEARCH RESULTS</p>/<p>ARTICLES</p>
                        </span>
                        <button className='h-10 px-8 rounded-full bg-gray-200 border w-fit border-gray-400'>
                            Guideline
                        </button>
                        <p className='text-[52px] text-brand-main font-medium max-w-[800px] leading-[56px]'>
                            {data?.data?.headline}
                        </p>
                        <span className='text-[#00000080] opacity-80 font-medium flex items-center gap-4 text-[14px] flex-wrap'>
                            <p>{data?.data?.headline}</p>/
                            <p>{formatDate(data?.data?.updatedAt)}</p>/<p>{data?.min}</p>
                        </span>
                    </span>
                    <span className='my-8 flex flex-col gap-16'>
                        <span className='flex w-full h-[500px] relative'>
                            <Image
                                src={data?.data?.image}
                                alt=''
                                width={1200}
                                height={100}
                                className='w-full h-auto rounded-2xl object-cover'
                            />
                        </span>

                        <span className='grid lg:grid-cols-5 grid-cols-1 gap-5 items-start'>
                            <span className='text-[#00000080] opacity-80 font-light flex items-center gap-4 text-[16px] uppercase col-span-1'>
                                <p>INTRODUCTION</p>
                            </span>
                            <p className='text-[18px] font-normal text-[#00000099] m-0 lg:col-span-4 col-span-1'>
                                {data?.data?.description}
                            </p>
                        </span>
                    </span>
                    <span className='grid lg:grid-cols-5 grid-cols-2 gap-5 items-start mb-10'>
                        <span className='text-[#00000080] opacity-80 font-light flex items-center gap-4 text-[16px] uppercase col-span-1'>
                            <p>Details</p>
                        </span>
                        <span className=' m-0 lg:col-span-4 col-span-1'>
                            {data?.data?.newsSections.map((item: any, index: any) => (
                                <RenderNewsSection data={item} key={index} />
                            ))}
                        </span>
                    </span>

                    <span className='grid lg:grid-cols-5 grid-cols-1 gap-5'>
                        <span className='col-span-1'></span>
                        <span className='flex gap-3 flex-wrap lg:col-span-4 col-span-1 '>
                            {data?.data.tags?.map((item: any, index: any) => (
                                <button
                                    key={index}
                                    className='h-10 px-8 rounded-full bg-gray-200 border w-fit border-gray-400'
                                >
                                    {item.name}
                                </button>
                            ))}
                        </span>
                        <span className='col-span-1'></span>
                        <span className='text-gray-400 gap-6  lg:col-span-4 col-span-1 flex items-center mt-5'>
                            <p className='flex items-center text-[14px]'>
                                <AiOutlineLike size={24} />
                                42
                            </p>
                            <p className='flex items-center text-[14px]'>
                                <AiOutlineDislike size={24} />
                            </p>
                            <p className='flex items-center text-[14px]'>
                                <IoShareOutline size={24} />
                            </p>
                        </span>
                    </span>
                    {/* <Divider className="my-12" /> */}
                    <span className='grid lg:grid-cols-5 grid-cols-1 gap-5 items-start my-12'>
                        <span className='text-[#00000080] opacity-80 font-light flex items-center gap-4 text-[16px] uppercase col-span-1'>
                            <p>RECOMMENDED RESOURCES</p>
                        </span>
                        <p className='text-[40px] leading-[40px] font-normal text-brand-main m-0 lg:col-span-4 col-span-1 max-w-[800px]'>
                            More Helpful Guides and Resources You Might Also Like
                        </p>
                    </span>
                    <span className='grid gap-5 lg:grid-cols-2 grid-cols-1 my-12'>
                        {[1, 2, 3, 4].map((item, index) => (
                            <ArticleCardTwo data={article} key={index} />
                        ))}
                    </span>
                </span>
            ) : (
                <LoadingSkeleton />
            )}
        </div>
    );
};

export default PreviewPage;
