"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/assets/logo.png";
import SideBarItem from "./SideBarItem";
import {
  LayoutDashboard,
  UsersRound,
  BriefcaseBusiness,
  Newspaper,
  Handshake,
  Cog,
  LogOut,
  SquareLibrary,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/auth/auth-slice";

const SideNavBar = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleLogout = () => {
    push("/login");
    dispatch(logout());
  };

  return (
    <div className=" sticky inset-y-0 w-[250px]  h-full border-r-[1px] ">
      <div className="flex flex-col h-screen py-3 gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center px-4 py-2">
            <div className="relative w-10 h-10">
              <Image src={logo} alt="" fill />
            </div>
            <h1 className="text-lg font-bold">PLSG APP</h1>
          </div>
          <div className="flex flex-col h-full w-full py-10 gap-4">
            <SideBarItem
              title="Dashboard"
              link="/dashboard"
              icon={<LayoutDashboard />}
            />
            <SideBarItem
              title="MDAs"
              link="/mdas"
              icon={<BriefcaseBusiness />}
            />
            <SideBarItem title="News" link="/news" icon={<Newspaper />} />
            <SideBarItem title="Users" link="/users" icon={<UsersRound />} />
            <SideBarItem
              title="Resources"
              link="/resources"
              icon={<SquareLibrary />}
            />
            {/* <SideBarItem title="Teams" link="/teams" icon={<Handshake />} /> */}
            <SideBarItem title="Settings" link="/settings" icon={<Cog />} />
          </div>
        </div>
        <span
          className="transition-fx flex w-full px-4 gap-3  py-4 cursor-pointer font-medium  border-r-4 border-red-500 hover:bg-red-100 hover:pl-8"
          onClick={() => handleLogout()}
        >
          <span className="text-red-500">
            <LogOut />
          </span>
          Logout
        </span>
      </div>
    </div>
  );
};

export default SideNavBar;
