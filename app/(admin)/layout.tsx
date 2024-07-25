import { AuthWrapper } from "@/components/AuthWrapper";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <div className="flex h-screen w-full overflow-x-hidden overflow-y-scroll">
        <SideNavBar />
        <div className="flex flex-col w-full relative">
          <NavBar />
          <div className="mt-[80px] w-full p-4 h-[calc(100vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
