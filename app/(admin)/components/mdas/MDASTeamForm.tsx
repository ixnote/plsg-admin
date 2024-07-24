'use client';
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MDASFormSchemaType } from '@/types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { PlusCircle, UploadCloud, X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const MDASTeamForm = () => {
  const form = useFormContext<MDASFormSchemaType>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'team',
  });

  const handleAddMember = () => {
    const member = {
      image: '',
      name: '',
      role: '',
    };
    append(member);
  };

  const handleRemoveMember = (index: number) => {
    remove(index);
  };

  return (
    <>
      {form && (
        <div className='flex flex-col w-full gap-6'>
          <div className='grid  grid-cols-2 w-full gap-6'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='flex w-full gap-2 border p-4 rounded-lg shadow relative'
              >
                <div
                  className='flex justify-center items-center absolute w-8 h-8 -top-4 -right-5 bg-red-400 rounded-full cursor-pointer'
                  onClick={() => {
                    handleRemoveMember(index);
                  }}
                >
                  <X color='white' size={20} />
                </div>
                <div className='w-[200px] flex-shrink-0'>
                  <FormField
                    control={form.control}
                    name={`team.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Image</FormLabel> */}
                        <FormControl>
                          <CldUploadWidget
                            onSuccess={(result, { widget }) => {
                              field.onChange((result?.info! as any).secure_url); // { public_id, secure_url, etc }
                              widget.close();
                            }}
                            uploadPreset='mymakaranta_preset'
                          >
                            {({ open }) => {
                              function handleOnClick() {
                                // field.onChange(undefined);
                                open();
                              }
                              return (
                                <div
                                  onClick={handleOnClick}
                                  className='flex justify-center h-[200px] border-2 border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip'
                                >
                                  {field.value === '' ? (
                                    <div className='flex flex-col justify-center items-center gap-2 '>
                                      <UploadCloud />
                                      <h1>Upload image</h1>
                                    </div>
                                  ) : (
                                    <Image
                                      src={field.value}
                                      alt='images'
                                      fill
                                    />
                                  )}
                                </div>
                              );
                            }}
                          </CldUploadWidget>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <FormField
                    control={form.control}
                    name={`team.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Name</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder='Enter Team member fullname'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`team.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Role</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder='Enter Team Member role'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <div
              className='flex flex-col w-full gap-2 border p-4 rounded-lg shadow min-h-[200px] justify-center items-center cursor-pointer'
              onClick={handleAddMember}
            >
              <PlusCircle size={40} />
              <h1>Add Team Member</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MDASTeamForm;
