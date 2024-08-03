'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const UpdateOtherInfo = ({ initialData = {}, setOtherInfo }: any) => {
  const [name, setName] = useState(initialData.name || '');
  const [role, setRole] = useState(initialData.role || '');
  const [image, setImage] = useState(initialData.image || '');
  const [title, setTitle] = useState(initialData.biography?.title || '');
  const [description, setDescription] = useState(
    initialData.biography?.description.join('\n') || ''
  );

  useEffect(() => {
    setName(initialData?.name || '');
    setRole(initialData?.role || '');
    setImage(initialData?.image || '');
    setTitle(initialData?.biography?.title || '');
    setDescription(initialData?.biography?.description.join('\n') || '');
  }, [initialData]);

  useEffect(() => {
    setOtherInfo({
      name,
      role,
      image,
      biography: {
        title,
        description: description.split('\n'),
      },
    });
  }, [name, role, image, title, description, setOtherInfo]);

  return (
    <div className='flex flex-col gap-10 h-full p-10'>
      <div className='flex flex-col gap-4'>
        <Input
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='Enter Role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          placeholder='Enter Image URL'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Input
          placeholder='Enter Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder='Enter Biography Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </div>
    </div>
  );
};

export default UpdateOtherInfo;
