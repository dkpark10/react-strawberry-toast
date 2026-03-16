import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Container API | react-strawberry-toast',
  description: 'Description of the Toast Container component options',
  openGraph: {
    title: 'Toast Container API | react-strawberry-toast',
    description: 'Description of the Toast Container component options',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/toast-container',
  },
};

export default async function DocApiToastContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
