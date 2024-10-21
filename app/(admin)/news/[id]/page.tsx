import SingleNews from './SingleNews';
import { baseURL, constructURL } from '@/utils/baseUrl';

export default function NewsPage() {
  return <SingleNews />;
}

export async function generateStaticParams() {

  try {
    const news = await fetch(constructURL(baseURL, 'news/admin/articles')).then((res) => res.json())

    if (!news.ok) {
      return [
        { id: '1' },
        { id: '2' },
      ];
    }

    return news?.data?.news.map((singleNews: any) => ({
      id: singleNews.id,
    }))
  } catch (error) {
    console.error('Error fetching resource:', error);
  }
}