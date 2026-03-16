import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Show Toast | react-strawberry-toast',
  description: 'Various functions for displaying a toast',
  openGraph: {
    title: 'Show Toast | react-strawberry-toast',
    description: 'Various functions for displaying a toast',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/show-toast`,
  },
};

export default async function DocShowToast() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}