'use client';
import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Grip, Pencil, Trash2 } from 'lucide-react';
import RenderElement from './RenderElement';
import Loader from '../Loader';

type SectionListProps = {
  sections: any[];
  onReOrder: (updateData: { id: number; position: number }[]) => void;
  isLoading: boolean;
};

const SectionList = ({ sections, onReOrder, isLoading }: SectionListProps) => {
  const [items, setItems] = useState(sections);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setItems(sections);
  }, [sections]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const xitems = Array.from(items);
    const [reorderItems] = xitems.splice(result.source.index, 1);
    xitems.splice(result.destination.index, 0, reorderItems);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updateSection = xitems.slice(startIndex, endIndex + 1);
    setItems(xitems);
    const bulkUpdate = updateSection.map((lesson) => ({
      id: lesson.id,
      position: xitems.findIndex((i) => i.id === lesson.id),
    }));
    onReOrder(bulkUpdate);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='sections'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex relative flex-col w-full max-h-[580px] overflow-y-scroll mb-3'
          >
            {isLoading && (
              <div className='flex items-center justify-center absolute inset-0 bg-black/15 backdrop-blur-sm z-10 rounded-xl'>
                <Loader />
              </div>
            )}
            {items.map((item, index) => (
              <RenderElement item={item} key={item.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
