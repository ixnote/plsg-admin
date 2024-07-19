"use client";
import React, { useEffect, useState } from "react";
import { columns, Mdas } from "./columns";
import { DataTable } from "./data-table";
import { useGetAllMdasQuery } from "@/redux/services/mdas/mdas-api";

const MDAs = () => {
  const [mdas, setMdas] = useState([]);

  const { data, isLoading } = useGetAllMdasQuery();

  console.log(data);

  useEffect(() => {
    if (data) {
      setMdas(data);
    }
  }, [mdas, data]);

  return (
    <div className="flex w-full h-full p-6">
      <div className="flex flex-col w-full gap-6">
        <h1 className="text-4xl font-geistsans font-semibold">
          Ministries, Departments and Agencies
        </h1>
        <div className="flex w-full">
          {mdas && (
            <DataTable columns={columns} data={mdas} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MDAs;
