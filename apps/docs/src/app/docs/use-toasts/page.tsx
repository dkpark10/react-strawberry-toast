import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'useToasts Hook API | react-strawberry-toast',
  description: 'Description of the useToast hook api',
  openGraph: {
    title: 'useToasts Hook API | react-strawberry-toast',
    description: 'Description of the useToast hook api',
    images: OG_IMAGE,
    type: 'website',
    url: `${SITE_URL}/docs/use-toasts`,
  },
};

export default async function DocApiToastContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
