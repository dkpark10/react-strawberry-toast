import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Styling | react-strawberry-toast',
  description: 'Styling of react-strawberry-toast',
  openGraph: {
    title: 'Styling | react-strawberry-toast',
    description: 'Styling of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/styling',
  },
};

export default async function DocsHeadlessHook() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}