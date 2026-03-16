import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Getting Started | react-strawberry-toast',
  description: 'Explanation of the basic usage of react-strawberry-toast',
  openGraph: {
    title: 'Getting Started Docs | react-strawberry-toast',
    description: 'Explanation of the basic usage of react-strawberry-toast',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs`,
  },
};

export default async function DocsIndexPage() {
  const { default: Page } = await import('./page_.mdx');

  return <Page />;
}
