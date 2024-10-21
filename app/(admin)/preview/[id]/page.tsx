import PreviewPage from './PreviewPage';
import { baseURL, constructURL } from '@/utils/baseUrl';

export default function PreviewPages() {
  return <PreviewPage />;
}

export async function generateStaticParams() {
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
}