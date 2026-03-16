import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast API | react-strawberry-toast',
  description: 'Description of the toast function options',
  openGraph: {
    title: 'Toast API | react-strawberry-toast',
    description: 'Description of the toast function options',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/toast',
  },
};

export default async function DocApiToast() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
