import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Toast API | react-strawberry-toast',
  description: 'Description of the toast function options',
  openGraph: {
    title: 'Toast API | react-strawberry-toast',
    description: 'Description of the toast function options',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/toast`,
  },
};

export default async function DocApiToast() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
