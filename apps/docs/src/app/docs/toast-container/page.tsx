import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Container API | react-strawberry-toast',
  description: 'Description of the Toast Container component options',
  openGraph: {
    title: 'Toast Container API | react-strawberry-toast',
    description: 'Description of the Toast Container component options',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/toast-container',
  },
};

export default async function DocApiToastContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
