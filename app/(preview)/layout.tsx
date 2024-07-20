import bgImage from '@/public/assets/bg.jpeg';
import Image from 'next/image';

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex w-full min-h-screen'>{children}</div>;
}
