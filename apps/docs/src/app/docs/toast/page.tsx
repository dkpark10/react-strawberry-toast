import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast API | react-strawberry-toast',
  description: 'Description of the toast function options',
  openGraph: {
    title: 'Toast API | react-strawberry-toast',
    description: 'Description of the toast function options',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/toast',
  },
};

export default async function DocApiToast() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
