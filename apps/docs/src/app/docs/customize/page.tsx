import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customize | react-strawberry-toast',
  description: 'Customize usage of react-strawberry-toast',
  openGraph: {
    title: 'Customize | react-strawberry-toast',
    description: 'Customize usage of react-strawberry-toast',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/customize',
  },
};

export default async function DocsCustomize() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
