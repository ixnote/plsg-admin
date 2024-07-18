import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToastProvider from '@/components/ToastProvider';
import ReduxProvider from '@/components/providers/redux-provider';
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PLSG Dashboard",
  description: "This is admin dashboard for plateau state",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <ToastProvider>{children}</ToastProvider>
        </ReduxProvider>
      </body>
=======
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className={inter.className}>{children}</body>
>>>>>>> c08e9c23421ed6b6c650b447ba70c52028611e8b
    </html>
  );
}
