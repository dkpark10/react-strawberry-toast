import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Toast Container API | react-strawberry-toast',
  description: 'Description of the Toast Container component options',
  openGraph: {
    title: 'Toast Container API | react-strawberry-toast',
    description: 'Description of the Toast Container component options',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/toast-container`,
  },
};

export default async function DocApiToastContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
