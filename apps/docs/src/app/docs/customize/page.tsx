import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customize | react-strawberry-toast',
  description: 'Customize usage of react-strawberry-toast',
  openGraph: {
    title: 'Customize | react-strawberry-toast',
    description: 'Customize usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/customize',
  },
};

export default async function DocsCustomize() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
