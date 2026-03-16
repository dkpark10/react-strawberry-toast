import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'useToasts Hook API | react-strawberry-toast',
  description: 'Description of the useToast hook api',
  openGraph: {
    title: 'useToasts Hook API | react-strawberry-toast',
    description: 'Description of the useToast hook api',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/use-toasts',
  },
};

export default async function DocApiToastContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
