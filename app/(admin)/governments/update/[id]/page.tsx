import UpdateGovernment from './UpdateGovernment';
import { baseURL, constructURL } from '@/utils/baseUrl';

export default function UpdateGovernmentPage() {
  return <UpdateGovernment />;
}

export async function generateStaticParams() {

  try {
    const governments = await fetch(constructURL(baseURL, 'statics/governments')).then((res) => res.json())

    if (!governments.ok) {
      return [
        { id: '1' },
        { id: '2' },
      ];
    }

    return governments?.data?.governments.map((government: any) => ({
      id: government.id,
    }))
  } catch (error) {
   
  }
}