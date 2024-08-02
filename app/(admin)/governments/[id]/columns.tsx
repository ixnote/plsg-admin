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
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];
