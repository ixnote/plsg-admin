import React from 'react';

import SingleCategory from './SingleCategory';

export default function CategoryPage({params}: any) {
  return <SingleCategory category={params?.id} />;
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ];
};