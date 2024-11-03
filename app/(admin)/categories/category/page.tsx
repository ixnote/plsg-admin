"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

import SingleCategory from './SingleCategory';

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <SingleCategory category={id} />;
}