'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/showToast';
import Loader from '../Loader';

import { useCreateResourceMutation } from '@/redux/services/resources/resources-api';
import {
  useGetAllTopicTagsQuery,
  useGetAllTypeTagsQuery,
} from '@/redux/services/tags/tags-api';
import { Textarea } from '@/components/ui/textarea';

const AddResourceTitleDialog = ({
  title = 'Create Resource',
}: {
  title?: string;
}) => {
  const { push } = useRouter();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topicTag, setTopictag] = useState<string>('Topic Tag');
  const [typeTag, setTypetag] = useState<string>('Type Tag');

  const [createResource, { data, isError, isLoading, isSuccess }] =
    useCreateResourceMutation();

  const {
    data: topicTags,
    error: topicTagsError,
    isLoading: topicTagsIsLoading,
  } = useGetAllTopicTagsQuery();

  const {
    data: typeTags,
    error: typeTagsError,
    isLoading: typeTagsIsLoading,
  } = useGetAllTypeTagsQuery();

  const handleSubmit = async () => {
    try {
      const result = await createResource({
        name: name,
        description: description,
        main_type_tag: typeTag,
        main_topic_tag: topicTag,
        all_topic_tags: [topicTag],
      }).unwrap();
      console.log(result);
      showToast('success', <p>{result?.message}</p>);
      push(`/resources/${result?.data?.id || '1'}`);
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-fit'>{title}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Resource</DialogTitle>
        </DialogHeader>
        <div className='flex w-full'>
          <Input
            placeholder='Resource Name'
            className='w-full'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value.toString() as string)}
          />
        </div>
        <div className='flex w-full'>
          <Textarea
            placeholder='Resource Description'
            className='resize-none w-full'
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.toString() as string)
            }
          />
          {/* <Input
            placeholder='Resource Description'
            className='w-full'
            type='text'
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.toString() as string)
            }
          /> */}
        </div>
        <div className='flex w-full'>
          <Select onValueChange={setTopictag}>
            <SelectTrigger className='w-full'>
              <SelectValue className='capitalize' placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              {topicTags?.data.map((item: any, i: number) => (
                <SelectItem key={i} value={item?.id} className='capitalize'>
                  {item?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-full'>
          <Select onValueChange={setTypetag}>
            <SelectTrigger className='w-full'>
              <SelectValue className='capitalize' placeholder='Type' />
            </SelectTrigger>
            <SelectContent>
              {typeTags?.data.map((item: any, i: number) => (
                <SelectItem key={i} value={item?.id} className='capitalize'>
                  {item?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            disabled={name === '' || name.length < 4}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader /> : 'Create Resource'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourceTitleDialog;
