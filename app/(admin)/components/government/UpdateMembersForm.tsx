'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import Image from 'next/image';

const UpdateMembersForm = ({ initialMembers = [] }: any) => {
  const [expandedMemberIndex, setExpandedMemberIndex] = useState<any>(null);
  const [members, setMembers] = useState<any>(initialMembers);
  const dispatch = useDispatch();

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  const toggleExpand = (index: any) => {
    setExpandedMemberIndex(expandedMemberIndex === index ? null : index);
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleFileChange = (index: any, event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Temporary URL for preview
      handleInputChange(index, 'image', imageUrl);
    }
  };

  const addNewMember = () => {
    setMembers([
      ...members,
      { name: '', role: '', email: '', image: '', isNew: true },
    ]);
  };

  const handleRemoveMember = (index: any) => {
    const updatedMembers = members.filter((_: any, i: any) => i !== index);
    setMembers(updatedMembers);
  };

  const handleSubmit = () => {
    console.log({ members });
  };

  return (
    <div className='w-full'>
      {members.length > 0 &&
        members.map((item: any, index: any) => (
          <div key={index}>
            <div
              className='w-full flex items-center justify-between mb-3 cursor-pointer hover:bg-green-100 p-3 rounded-md'
              onClick={() => toggleExpand(index)}
            >
              <h1 className='font-geistsans font-medium'>
                {item.name || 'New Member'}
              </h1>

              <div className='flex items-center gap-2'>
                {item.isNew && (
                  <Trash2
                    size={16}
                    className='cursor-pointer text-red-500'
                    onClick={() => handleRemoveMember(index)}
                  />
                )}
                <div className='rounded-full bg-green-100 text-xs h-5 w-5 flex items-center justify-center'>
                  {index + 1}
                </div>
                {expandedMemberIndex === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </div>
            </div>

            {/* Expandable form section */}
            {expandedMemberIndex === index && (
              <div className='flex flex-col w-full gap-6'>
                <div className='grid grid-cols-2 w-full gap-4'>
                  <div className='w-full'>
                    <Input
                      placeholder='Enter Name'
                      value={item.name}
                      onChange={(e) =>
                        handleInputChange(index, 'name', e.target.value)
                      }
                    />
                  </div>
                  <div className='w-full flex items-center'>
                    <Input
                      type='file'
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    {item.image && (
                      <div className='ml-4 w-10 h-10 relative'>
                        <Image
                          src={item.image}
                          alt={`${item.name}'s profile`}
                          layout='fill'
                          objectFit='cover'
                          className='rounded-full'
                        />
                      </div>
                    )}
                  </div>
                  <div className='w-full'>
                    <Input
                      placeholder='Enter Role'
                      value={item.role}
                      onChange={(e) =>
                        handleInputChange(index, 'role', e.target.value)
                      }
                    />
                  </div>
                  <div className='w-full'>
                    <Input
                      placeholder='Enter Email'
                      value={item.email}
                      onChange={(e) =>
                        handleInputChange(index, 'email', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

      {/* Show empty form when no members are available */}
      {members.length === 0 && (
        <div className='flex flex-col w-full gap-6'>
          <div className='grid grid-cols-2 w-full gap-4'>
            <div className='w-full'>
              <Input
                placeholder='Enter Name'
                value=''
                onChange={(e) =>
                  handleInputChange(members.length, 'name', e.target.value)
                }
              />
            </div>
            <div className='w-full flex items-center'>
              <Input
                type='file'
                onChange={(e) => handleFileChange(members.length, e)}
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder='Enter Role'
                value=''
                onChange={(e) =>
                  handleInputChange(members.length, 'role', e.target.value)
                }
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder='Enter Email'
                value=''
                onChange={(e) =>
                  handleInputChange(members.length, 'email', e.target.value)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Button to add new member */}
      <div className='w-full mt-3 cursor-pointer' onClick={addNewMember}>
        <p className='text-main hover:underline font-medium'>Add More</p>
      </div>
    </div>
  );
};

export default UpdateMembersForm;
