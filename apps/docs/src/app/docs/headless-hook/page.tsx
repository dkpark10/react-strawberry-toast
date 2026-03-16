import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Headless Hook | react-strawberry-toast',
  description: 'Headless-hook usage of react-strawberry-toast',
  openGraph: {
    title: 'Headless Hook | react-strawberry-toast',
    description: 'Headless-hook usage of react-strawberry-toast',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/headless-hook`,
  },
};

export default async function DocsHeadlessHook() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;

}
