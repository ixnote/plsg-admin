"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Mdas = {
  id: string;
  name: string;
  status: "draft" | "suspended" | "published";
};

export const columns: ColumnDef<Mdas>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Published",
  },
];
