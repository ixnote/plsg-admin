'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { UploadCloud } from 'lucide-react';
import { showToast } from '@/lib/showToast';
import Loader from '../Loader';
import { useUpdateResourceMutation } from '@/redux/services/resources/resources-api';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  useGetAllTopicTagsQuery,
  useGetAllTypeTagsQuery,
} from '@/redux/services/tags/tags-api';
import Editor from '../Editor';

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  main_type_tag: z.string(),
  main_topic_tag: z.string(),
  body: z.string(),
  all_topic_tags: z.array(z.string()),
});

type ResourceInfoSectionProps = {
  data: any;
};

const ResourceInfoSection = ({ data }: ResourceInfoSectionProps) => {
  const router = useRouter();
  // const [subTopic, setSubTopic] = useState() as any;
  const [
    updateResource,
    { data: resourceData, isError, isLoading, isSuccess },
  ] = useUpdateResourceMutation();

  const {
    data: topicTags,
    error: topicTagsError,
    isLoading: topicTagsIsLoading,
  } = useGetAllTopicTagsQuery();
  console.log('🚀 ~ ResourceInfoSection ~ topicTags:', topicTags);

  const {
    data: typeTags,
    error: typeTagsError,
    isLoading: typeTagsIsLoading,
  } = useGetAllTypeTagsQuery();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.data?.name ?? '',
      description: data?.data?.description ?? '',
      image: data?.data?.image ?? '',
      body: data?.data?.body ?? '',
      main_type_tag: data.data?.main_type_tag?.id ?? '',
      main_topic_tag: data?.data?.main_topic_tag?.id ?? '',
      all_topic_tags: data?.data.all_topic_tags.map((tag: any) => tag.id) ?? [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Filter out the empty values
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== '')
      );

      const result = await updateResource({
        id: data.data.id,
        ...filteredValues,
      }).unwrap();

      showToast('success', <p>{result?.message}</p>);
      router.back();
    } catch (error: any) {
      showToast('error', <p>{error.data.message}</p>);
    }
  }

  return (
    <div className='flex flex-col w-full rounded-xl text-card-foreground p-6 gap-3 mb-10 h-fit'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-semibold tracking-tight text-xl'>
          Resource Information
        </h1>
        <p>Update necessary information about this resource.</p>
      </div>
      <div className='w-full '>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col gap-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter name here'
                      {...field}
                      className=' col-span-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Write a little bit about this resource'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='w-full'>
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Image</FormLabel>
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
                            field.onChange(undefined);
                            open();
                          }
                          return (
                            <div
                              onClick={handleOnClick}
                              className='flex justify-center h-[250px] border border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip'
                            >
                              {field.value === '' ? (
                                <div className='flex flex-col justify-center items-center gap-2 '>
                                  <UploadCloud />
                                  <h1>Upload image</h1>
                                </div>
                              ) : (
                                <Image src={field.value} alt='images' fill />
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
            <div className='flex w-full gap-6'>
              <div className='flex w-full'>
                <FormField
                  control={form.control}
                  name='main_topic_tag'
                  render={({ field }) => (
                    <FormItem className='flex flex-col w-full'>
                      <FormLabel>Resource Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          console.log(
                            '🚀 ~ ResourceInfoSection ~ value:',
                            value
                          );
                          return {};
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              className='capitalize'
                              placeholder='Select resource category'
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topicTags?.data.map((item: any, i: number) => (
                            <SelectItem
                              key={i}
                              value={item?.id}
                              className='capitalize'
                            >
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className=' flex w-full'>
                <FormField
                  control={form.control}
                  name='main_type_tag'
                  render={({ field }) => (
                    <FormItem className='flex flex-col w-full'>
                      <FormLabel>Resource Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              className='capitalize'
                              placeholder='Select Type'
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typeTags?.data.map((item: any, i: number) => (
                            <SelectItem
                              key={i}
                              value={item?.id}
                              className='capitalize'
                            >
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {form.getValues('main_type_tag') ===
            typeTags?.data?.find((item: any) => item.name === 'document')
              ?.id ? (
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='body'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Document</FormLabel>
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
                              field.onChange(undefined);
                              open();
                            }
                            return (
                              <div
                                onClick={handleOnClick}
                                className='flex justify-center h-[250px] border border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip'
                              >
                                {field.value === '' ? (
                                  <div className='flex flex-col justify-center items-center gap-2 '>
                                    <UploadCloud />
                                    <h1>Upload Document</h1>
                                  </div>
                                ) : (
                                  <Image src={field.value} alt='images' fill />
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
            ) : (
              <FormField
                control={form.control}
                name='body'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document</FormLabel>
                    <FormControl>
                      <div className='flex w-full h-[400px]'>
                        <Editor
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className='col-span-2 flex'>
              <FormField
                control={form.control}
                name='all_topic_tags'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select from Topic Tags</FormLabel>
                    <FormControl>
                      {/* <Input placeholder='Enter name here' {...field} /> */}
                      <div className='flex w-full flex-wrap'>
                        <ToggleGroup
                          type='multiple'
                          defaultValue={field.value}
                          onValueChange={(v) => {
                            console.log(v);

                            field.onChange(v);
                          }}
                          className='flex w-full justify-start flex-wrap'
                        >
                          {topicTags?.data?.map((tag: any, index: number) => (
                            <ToggleGroupItem value={tag.id} key={index}>
                              {tag.name}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-2 flex items-center justify-end'>
              <Button type='submit' className=''>
                {isLoading ? <Loader /> : ' Update Resource'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResourceInfoSection;
