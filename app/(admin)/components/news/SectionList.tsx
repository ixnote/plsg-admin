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

type SectionListProps = {
  sections: any[];
  onReOrder: (updateData: { id: number; position: number }[]) => void;
  onDelete: (id: number) => void;
};

const SectionList = ({ sections, onReOrder, onDelete }: SectionListProps) => {
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
            className='flex flex-col w-full max-h-[580px] overflow-y-scroll'
          >
            {items.map((item, index) => (
              <RenderElement
                item={item}
                key={item.id}
                onDelete={onDelete}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
