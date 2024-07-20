import bgImage from '@/public/assets/bg.jpeg';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='flex h-screen w-3/5 p-6'>
        <div className='flex bg-slate-400 w-full h-full rounded-3xl relative overflow-hidden'>
          <Image src={bgImage} alt='' fill />
        </div>
      </div>
      <div className='flex h-screen w-2/5 py-10 px-20'>{children}</div>
    </div>
  );
}
