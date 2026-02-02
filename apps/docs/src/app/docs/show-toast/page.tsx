import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Show Toast | react-strawberry-toast',
  description: 'Various functions for displaying a toast',
  openGraph: {
    title: 'Show Toast | react-strawberry-toast',
    description: 'Various functions for displaying a toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/show-toast'
  },
};

export default async function DocShowToast() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}