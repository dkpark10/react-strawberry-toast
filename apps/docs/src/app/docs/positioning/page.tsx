import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Positioning | react-strawberry-toast',
  description: 'Positioning of react-strawberry-toast',
  openGraph: {
    title: 'Positioning | react-strawberry-toast',
    description: 'Positioning of react-strawberry-toast',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/positioning`,
  },
};

export default async function DocsPositioning() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}