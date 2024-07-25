"use client";
import React, { useEffect, useState } from "react";
import { columns, News } from "./columns";
import { DataTable } from "./data-table";
import { useGetAllNewsQuery } from "@/redux/services/news/news-api";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [newsPagination, setNewsPagination] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useGetAllNewsQuery({
    page: currentPage,
    pageSize,
  });

  // console.log(data);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  useEffect(() => {
    if (data) {
      const res = data.data.news.map((item: any) => ({
        id: item.id,
        headline: item.headline,
        sections: item.newsSections.length,
        is_posted: item.is_posted,
      }));
      setNews(res);
      setNewsPagination(data);
    }
  }, [data]);

  return (
    <div className="flex w-full h-full p-6">
      <div className="flex flex-col w-full gap-6">
        <h1 className="text-2xl font-geistsans font-semibold">News</h1>
        <div className="flex w-full">
          <DataTable
            columns={columns}
            data={news}
            isLoading={isLoading}
            pagination={newsPagination?.data?.pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
