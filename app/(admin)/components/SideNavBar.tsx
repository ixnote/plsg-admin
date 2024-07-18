import React from "react";
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
} from "lucide-react";

const SideNavBar = () => {
  return (
    <div className=" sticky w-[250px]  h-full min-h-screen border-r-[1px]">
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
            <SideBarItem title="Teams" link="/teams" icon={<Handshake />} />
            <SideBarItem title="Settings" link="/settings" icon={<Cog />} />
          </div>
        </div>
        <SideBarItem title="Logout" link="#" icon={<LogOut />} logout />
      </div>
    </div>
  );
};

export default SideNavBar;
