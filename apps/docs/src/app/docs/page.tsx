import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started | react-strawberry-toast',
  description: 'Explanation of the basic usage of react-strawberry-toast',
  openGraph: {
    title: 'Getting Started Docs | react-strawberry-toast',
    description: 'Explanation of the basic usage of react-strawberry-toast',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs',
  },
};

export default async function DocsIndexPage() {
  const { default: Page } = await import('./page_.mdx');

  return <Page />;
}
