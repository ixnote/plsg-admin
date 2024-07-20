"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetAllUsersQuery } from "@/redux/services/users/user-api";
import AddUsers from "../components/users/AddUsers";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const { data, isLoading, refetch } = useGetAllUsersQuery();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleUserCreated = () => {
    refetch();
  };

  return (
    <div className="flex w-full h-full p-6">
      <div className="flex flex-col w-full gap-6">
        <h1 className="text-4xl font-geistsans font-semibold">Users</h1>
        <div className="flex w-full justify-between"></div>
        <div className="flex w-full">
          {users?.data && (
            <DataTable
              columns={columns}
              data={users?.data}
              isLoading={isLoading}
              onUserCreated={handleUserCreated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
