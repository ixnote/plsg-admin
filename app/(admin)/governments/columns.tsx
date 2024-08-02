"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Governments = {
  id: string;
  name: string;
  active: string;
  start: string;
};

export const columns: ColumnDef<Governments>[] = [
  {
    accessorKey: "name",
    header: "Governor's name",
  },
  {
    accessorKey: "active",
    header: "Status",
  },
  {
    accessorKey: "start",
    header: "Start Date",
  },
];
