import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Show Toast | react-strawberry-toast',
  description: 'Various functions for displaying a toast',
  openGraph: {
    title: 'Show Toast | react-strawberry-toast',
    description: 'Various functions for displaying a toast',
    images: 'https://react-strawberry-toast.com/strawberry.png',
    type: 'website',
    url: 'https://react-strawberry-toast.com/docs/show-toast'
  },
};

export default async function DocShowToast() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}