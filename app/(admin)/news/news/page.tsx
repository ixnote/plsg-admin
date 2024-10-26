"use client";

import SingleNews from './SingleNews';
import { useSearchParams } from 'next/navigation';

export default function NewsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  return <SingleNews id={id} />;
}