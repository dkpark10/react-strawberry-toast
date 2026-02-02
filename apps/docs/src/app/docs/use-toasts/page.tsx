import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'useToasts Hook API | react-strawberry-toast',
  description: 'Description of the useToast hook api',
  openGraph: {
    title: 'useToasts Hook API | react-strawberry-toast',
    description: 'Description of the useToast hook api',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/use-toasts',
  },
};

export default async function DocApiToastContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
