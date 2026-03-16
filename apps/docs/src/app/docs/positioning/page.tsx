import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Positioning | react-strawberry-toast',
  description: 'Positioning of react-strawberry-toast',
  openGraph: {
    title: 'Positioning | react-strawberry-toast',
    description: 'Positioning of react-strawberry-toast',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/positioning',
  },
};

export default async function DocsPositioning() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}