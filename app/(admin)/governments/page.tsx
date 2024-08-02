"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetGovernmentQuery } from "@/redux/services/government/government-api";

const Government = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [government, setGovernment] = useState<any>([]);

  const { data, isLoading } = useGetGovernmentQuery({
    page: currentPage,
    pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  useEffect(() => {
    if (data) {
      setGovernment(data);
    }
  }, [data]);

  return (
    <div className="flex w-full h-full p-6">
      <div className="flex flex-col w-full gap-6">
        <h1 className="text-2xl font-semibold font-oswald">Government</h1>
        <div className="flex w-full h-full">
          <DataTable
            columns={columns}
            data={government?.data?.governments || []}
            isLoading={isLoading}
            pagination={government?.data?.pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onUserCreated={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Government;
