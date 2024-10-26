"use client";

import UpdateGovernment from './UpdateGovernment';
import { useSearchParams } from 'next/navigation';

export default function UpdateGovernmentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <UpdateGovernment id={id} />;
}