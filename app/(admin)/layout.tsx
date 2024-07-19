import { AuthWrapper } from '@/components/AuthWrapper';
import NavBar from './components/NavBar';
import SideNavBar from './components/SideNavBar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <div className='flex h-screen w-full'>
        <SideNavBar />
        <div className='flex flex-col w-full relative'>
          <NavBar />
          <div className='mt-[80px] w-full p-4 overflow-y-auto'>{children}</div>
        </div>
      </div>
    </AuthWrapper>
  );
}
