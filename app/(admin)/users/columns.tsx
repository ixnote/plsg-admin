"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Users = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: string;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
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
    accessorKey: "role",
    header: "Role",
  },
];
