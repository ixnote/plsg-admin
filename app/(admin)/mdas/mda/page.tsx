"use client";
import SingleMDAs from './SingleMDAs';
import { useSearchParams } from 'next/navigation';

export default function GovernmentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <SingleMDAs id={id} />;
}