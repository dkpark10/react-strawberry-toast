import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Positioning | react-strawberry-toast',
  description: 'Positioning of react-strawberry-toast',
  openGraph: {
    title: 'Positioning | react-strawberry-toast',
    description: 'Positioning of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/positioning',
  },
};

export default async function DocsPositioning() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}