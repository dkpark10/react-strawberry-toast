import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Multi Container | react-strawberry-toast',
  description: 'Multi container usage of react-strawberry-toast',
  openGraph: {
    title: 'Multi Container | react-strawberry-toast',
    description: 'Multi container usage of react-strawberry-toast',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/multi-container`,
  },
};

export default async function DocsMultiContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
