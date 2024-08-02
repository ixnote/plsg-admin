import React from 'react';
import Image from 'next/image';

type RenderNewsSectionProps = {
  data: any;
};

const RenderNewsSection = ({ data }: RenderNewsSectionProps) => {
  return (
    <div className='flex py-2'>
      {data?.type === 'image' && (
        <Image
          src={data?.value}
          alt=''
          width={1200}
          height={1200}
          className='w-full h-auto rounded-2xl object-cover'
        />
      )}
      {data?.type === 'paragraph' && (
        <p className='text-[18px] font-normal text-[#00000099] m-0'>
          {data?.value}
        </p>
      )}
      {data?.type === 'heading' && (
        <p className='text-[28px] font-bold text-black m-0'>{data?.value}</p>
      )}
      {data?.type === 'sub_heading' && (
        <p className='text-[20px] font-semibold text-black/70 m-0'>
          {data?.value}
        </p>
      )}
      {data?.type === 'section_title' && (
        <p className='text-[18px] font-medium text-[#00000099] m-0'>
          {data?.value}
        </p>
      )}
      {data?.type === 'text' && (
        <p className='text-[18px] font-normal text-[#00000099] m-0'>
          {data?.value}
        </p>
      )}
      {data?.type === 'bullet' && (
        <ol className='flex flex-col gap-3'>
          {data.value.map((i: any, index: number) => (
            <li key={index}>
              {index + 1}.{i}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RenderNewsSection;
