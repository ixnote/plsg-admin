import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import {
  ALargeSmall,
  FileVideo,
  Heading1,
  Heading2,
  Highlighter,
  ImageIcon,
  LayoutPanelTop,
  ListOrdered,
  Pilcrow,
  Trash2Icon,
  UploadCloud,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import SectionBtn from "./SectionBtn";
import { useCreateNewsSectionMutation } from "@/redux/services/news/news-api";
import Loader from "../Loader";
import { showToast } from "@/lib/showToast";

type SectionInfoSectionProps = {
  data: any;
};

const SectionInfoSection = ({ data }: SectionInfoSectionProps) => {
  const [
    createNewsSection,
    { data: createNewsSectionData, isError, isLoading, isSuccess },
  ] = useCreateNewsSectionMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fields: [
        {
          type: "paragraph",
          value: "",
          position: data?.data?.newsSections?.length + 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const handleAddSection = (type: string) => {
    const section = {
      type: type,
      value: "",
      position: data.data.newsSections.length + 1 + fields.length,
    };
    append(section);
  };

  const onSubmit = async (values: any) => {
    const payload = values.fields as {
      type: string;
      value: string;
      position: number;
    }[];

    if (!payload.every((b) => b.value !== "")) {
      // showToast('error', <p>All Sections Fields are required</p>);
      return;
    }

    const bullet = payload.filter((b) => b.type === "bullet");

    const modifyBullets = bullet?.map((v) => ({
      type: v.type,
      value: v.value.split(","),
      position: v.position,
    }));

    const remain = payload.filter((b) => b.type !== "bullet");

    const combine = [
      ...remain,
      ...modifyBullets.map((b) => ({ type: "bullet", value: b })),
    ];

    try {
      console.log({
        id: data.data.id,
        items: [...combine],
      });
      const result = await createNewsSection({
        id: data.data.id,
        items: [...combine],
      }).unwrap();
      showToast("success", <p>{result?.message}</p>);
    } catch (error: any) {
      showToast("error", <p>{error?.data?.message}</p>);
    }
  };

  return (
    <div className="flex flex-col w-1/2 rounded-xl border bg-card text-card-foreground shadow p-6 mb-10 h-fit gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold tracking-tight text-xl">
          Section Information
        </h1>
        <p>Add Sections in order you want to display on the page.</p>
      </div>
      <div className="flex flex-col w-full py-4 ">
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-full gap-3 items-center">
              <div className="flex flex-col w-full gap-2">
                {fields[index].type === "paragraph" && (
                  <Controller
                    name={`fields.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="eg. Some great information"
                      />
                    )}
                  />
                )}
                {fields[index].type === "bullet" && (
                  <Controller
                    name={`fields.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="eg. imformation,news,education"
                      />
                    )}
                  />
                )}
                {fields[index].type === "image" && (
                  <Controller
                    name={`fields.${index}.value`}
                    control={control}
                    render={({ field }) => (
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
                    )}
                  />
                )}
              </div>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => remove(index)}
              >
                <Trash2Icon size={20} />
              </Button>
            </div>
          ))}
          <div className="flex justify-between items-center p-3 w-full border-2 bg-slate-100 border-dashed rounded-lg">
            <SectionBtn
              title="Add Paragraph"
              icon={<Pilcrow />}
              onClick={() => {
                handleAddSection("paragraph");
              }}
            />
            <SectionBtn
              title="Add Image"
              icon={<ImageIcon />}
              onClick={() => {
                handleAddSection("image");
              }}
            />
            <SectionBtn
              title="Add Bulletin"
              icon={<ListOrdered />}
              onClick={() => {
                handleAddSection("bullet");
              }}
            />
            <SectionBtn
              title="Add Header"
              icon={<Heading1 />}
              onClick={() => {}}
            />
            <SectionBtn
              title="Add Highlight"
              icon={<Highlighter />}
              onClick={() => {}}
            />
            {/* <SectionBtn title='Add Video' icon={<FileVideo />} onClick={()=>{}} /> */}
            <SectionBtn
              title="Add Text"
              icon={<ALargeSmall />}
              onClick={() => {}}
            />
            <SectionBtn
              title="Add Sub Heading"
              icon={<Heading2 />}
              onClick={() => {}}
            />
            <SectionBtn
              title="Add Section Heading"
              icon={<LayoutPanelTop />}
              onClick={() => {}}
            />
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? <Loader /> : "Create Section"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SectionInfoSection;
