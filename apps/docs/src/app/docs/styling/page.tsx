import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Styling | react-strawberry-toast',
  description: 'Styling of react-strawberry-toast',
  openGraph: {
    title: 'Styling | react-strawberry-toast',
    description: 'Styling of react-strawberry-toast',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/styling',
  },
};

export default async function DocsHeadlessHook() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}