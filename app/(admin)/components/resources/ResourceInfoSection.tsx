"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { UploadCloud } from "lucide-react";
import { useUpdateNewsMutation } from "@/redux/services/news/news-api";
import { showToast } from "@/lib/showToast";
import Loader from "../Loader";
import { useCreateResourceMutation } from "@/redux/services/resources/resources-api";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useGetAllTopicTagsQuery,
  useGetAllTypeTagsQuery,
} from "@/redux/services/tags/tags-api";

const formSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(2),
  link: z.string().min(2),
  file: z.string(),
  main_type_tag: z.string(),
  sub_type_tag: z.string(),
  main_topic_tag: z.string(),
  sub_topic_tag: z.string(),
  all_topic_tags: z.array(z.string()),
});

type ResourceInfoSectionProps = {
  data: any;
};

const ResourceInfoSection = ({ data }: ResourceInfoSectionProps) => {
  console.log("🚀 ~ ResourceInfoSection ~ data:", data);
  // const [updateNews, { isError, isLoading, isSuccess }] =
  //   useUpdateNewsMutation();

  const [
    createResource,
    { data: resourceData, isError, isLoading, isSuccess },
  ] = useCreateResourceMutation();

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

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.data?.name ?? "",
      title: data?.data.title ?? "",
      description: data?.data?.description ?? "",
      link: data?.data?.link ?? "",
      file: data?.data?.file ?? "",
      main_type_tag: data?.data?.main_type_tag?.id ?? "",
      sub_type_tag: data?.data?.sub_type_tag?.id ?? "",
      main_topic_tag: data?.data?.main_topic_tag?.id ?? "",
      sub_topic_tag: data?.data?.sub_topic_tag?.id ?? "",
      all_topic_tags: data?.data.all_topic_tags.map((tag: any) => tag.id) ?? [],
    },
  });

  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     console.log(values);
  //     const result = await updateNews({ id: data.data.id, ...values }).unwrap();
  //     showToast("success", <p>{result?.message}</p>);
  //   } catch (error: any) {
  //     showToast("error", <p>{error.data.message}</p>);
  //   }
  // }

  return (
    <div className="flex flex-col w-1/2 rounded-xl border bg-card text-card-foreground shadow p-6 gap-3 mb-10 h-fit">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold tracking-tight text-xl">
          Resource Information
        </h1>
        <p>Update necessary information about this resource.</p>
      </div>
      <div className="w-full ">
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a little bit about this resource"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter link here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <CldUploadWidget
                      onSuccess={(result, { widget }) => {
                        field.onChange((result?.info! as any).secure_url); // { public_id, secure_url, etc }
                        widget.close();
                      }}
                      uploadPreset="mymakaranta_preset"
                    >
                      {({ open }) => {
                        function handleOnClick() {
                          field.onChange(undefined);
                          open();
                        }
                        return (
                          <div
                            onClick={handleOnClick}
                            className="flex justify-center h-[250px] border border-dashed cursor-pointer  items-center w-full rounded-md relative  overflow-clip"
                          >
                            {field.value === "" ? (
                              <div className="flex flex-col justify-center items-center gap-2 ">
                                <UploadCloud />
                                <h1>Upload image</h1>
                              </div>
                            ) : (
                              <Image src={field.value} alt="images" fill />
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
            <FormField
              control={form.control}
              name="main_topic_tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Topic Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="capitalize"
                          placeholder="Select Main Topic Tag"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {topicTags?.data.map((item: any, i: number) => (
                        <SelectItem
                          key={i}
                          value={item?.id}
                          className="capitalize"
                        >
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="main_type_tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Type Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="capitalize"
                          placeholder="Select Main Type Tag"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeTags?.data.map((item: any, i: number) => (
                        <SelectItem
                          key={i}
                          value={item?.id}
                          className="capitalize"
                        >
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="all_topic_tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>All Topic Tags</FormLabel>
                  <FormControl>
                    {/* <Input placeholder='Enter name here' {...field} /> */}
                    <div className="flex w-full flex-wrap">
                      <ToggleGroup
                        type="multiple"
                        defaultValue={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                        }}
                        className="flex w-full justify-start flex-wrap"
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

            <Button type="submit" className="w-full">
              {isLoading ? <Loader /> : " Update News"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResourceInfoSection;
