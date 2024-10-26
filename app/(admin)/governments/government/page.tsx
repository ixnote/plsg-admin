"use client";

import SingleGovernment from './SingleGovernment';
import { useSearchParams } from 'next/navigation';

export default function GovernmentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <SingleGovernment id={id} />;
}