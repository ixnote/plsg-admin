'use client';
import { showToast } from '@/lib/showToast';
import { useDeleteNewsSectionMutation } from '@/redux/services/news/news-api';
import { cn } from '@/utils';
import { Draggable } from '@hello-pangea/dnd';
import { Grip, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Loader from '../Loader';

type RenderElementProps = {
  item: any;
  index: number;
};

const RenderElement = ({ item, index }: RenderElementProps) => {
  const [deleteNewsSection, { data, isError, isLoading, isSuccess }] =
    useDeleteNewsSectionMutation();
  const handleDelete = async (id: any) => {
    try {
      const result = await deleteNewsSection({
        id: id,
      }).unwrap();
      showToast('success', <p>{result?.message}</p>);
    } catch (error: any) {
      showToast('error', <p>{error?.data?.message}</p>);
    }
  };

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <div
          className={cn(
            'flex w-full items-center gap-x-2 bg-slate-200 border border-slate-200 rounded-md text-slate-700 mb-2 text-sm'
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={cn(
              'px-2 py-2 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition'
            )}
            {...provided.dragHandleProps}
          >
            <Grip className=' h-5 w-5' />
          </div>
          {item.type === 'paragraph' && <p>{item.value}</p>}
          {item.type === 'heading' && (
            <h1 className=' text-3xl font-bold'>{item.value}</h1>
          )}
          {item.type === 'sub_heading' && (
            <h1 className=' text-2xl font-semibold'>{item.value}</h1>
          )}
          {item.type === 'section_title' && (
            <h1 className=' text-lg font-medium'>{item.value}</h1>
          )}
          {item.type === 'text' && (
            <h1 className=' text-md font-normal'>{item.value}</h1>
          )}
          {item.type === 'image' && (
            <div className='flex relative w-full h-[200px]'>
              <Image src={item.value} alt={item.id} fill />
            </div>
          )}
          {item.type === 'bullet' && (
            <div className='flex relative w-full h-auto'>
              <ol className=' py-2'>
                {item.value.map((i: any, index: number) => (
                  <li key={index}>{i}</li>
                ))}
              </ol>
            </div>
          )}
          <div className=' ml-auto pr-2 flex items-center gap-x-2'>
            {isLoading ? (
              <Loader />
            ) : (
              <Trash2
                onClick={() => {
                  handleDelete(item.id);
                }}
                className=' h-4 w-4 cursor-pointer hover:opacity-75 transition'
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default RenderElement;
