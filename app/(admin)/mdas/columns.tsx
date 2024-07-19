"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Mdas = {
  id: string;
  name: string;
  director: string;
  location: string;
  phone: string;
  email: string;
  status: "draft" | "suspended" | "published";
};

export const columns: ColumnDef<Mdas>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "director",
    header: "Director",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
