"use client";

import SingleResources from './SingleResources';
 import { useSearchParams } from 'next/navigation';

export default function ResourcesPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <SingleResources  id={id} />
}