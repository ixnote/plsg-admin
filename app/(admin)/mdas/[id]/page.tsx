import SingleMDAs from './SingleMDAs';
import { baseURL, constructURL } from '@/utils/baseUrl';

export default function GovernmentPage() {
  return <SingleMDAs />;
}

// export async function generateStaticParams() {
//   const mdas = await fetch(constructURL(baseURL, 'mda/admin')).then((res) => res.json())

//   return mdas?.data?.mdas.map((mda: any) => ({
//     id: mda.id,
//   }))
// }

export async function generateStaticParams() {

  try {
    const mdas = await fetch(constructURL(baseURL, 'mda/admin')).then((res) => res.json())

    if (!mdas.ok) {
      return [
        { id: '1' },
        { id: '2' },
      ];
    }

    return mdas?.data?.mdas.map((mda: any) => ({
      id: mda.id,
    }))
  } catch (error) {

  }
}