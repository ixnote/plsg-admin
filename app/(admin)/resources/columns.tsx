"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ResourcesDataType = {
  id: string;
  name: string;
  main_topic_tag: string;
  main_type_tag: string;
};

export const columns: ColumnDef<ResourcesDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "main_topic_tag",
    header: "Main Topic Tag",
  },
  {
    accessorKey: "main_type_tag",
    header: "Main Type Tag",
  },
];
