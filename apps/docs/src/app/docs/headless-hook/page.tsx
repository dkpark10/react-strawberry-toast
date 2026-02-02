import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Headless Hook | react-strawberry-toast',
  description: 'Headless-hook usage of react-strawberry-toast',
  openGraph: {
    title: 'Headless Hook | react-strawberry-toast',
    description: 'Headless-hook usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/headless-hook',
  },
};

export default async function DocsHeadlessHook() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;

}
