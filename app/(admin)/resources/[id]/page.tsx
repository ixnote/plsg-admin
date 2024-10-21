import SingleResources from './SingleResources';
import { baseURL, constructURL } from '@/utils/baseUrl';

export default function ResourcesPage() {
  return <SingleResources />;
}



export async function generateStaticParams() {
  const resources = await fetch(constructURL(baseURL, 'resource/mda')).then((res) => res.json())

  if (!resources.ok) {
    return [
      { id: '1' },
      { id: '2' },
    ];
  }

  return resources?.data?.resources.map((resource: any) => ({
    id: resource.id,
  }))
}