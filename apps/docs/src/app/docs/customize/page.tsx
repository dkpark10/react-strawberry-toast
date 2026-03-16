import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Customize | react-strawberry-toast',
  description: 'Customize usage of react-strawberry-toast',
  openGraph: {
    title: 'Customize | react-strawberry-toast',
    description: 'Customize usage of react-strawberry-toast',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/customize`,
  },
};

export default async function DocsCustomize() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
