import NavBar from './components/NavBar';
import SideNavBar from './components/SideNavBar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex  min-h-screen w-full'>
      <SideNavBar />
      <div className='flex flex-col w-full'>
        <NavBar />
        <div className=' mt-[80px] h-full w-full'>{children}</div>
      </div>
    </div>
  );
}
