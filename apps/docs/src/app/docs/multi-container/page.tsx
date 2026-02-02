import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Multi Container | react-strawberry-toast',
  description: 'Multi container usage of react-strawberry-toast',
  openGraph: {
    title: 'Multi Container | react-strawberry-toast',
    description: 'Multi container usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/multi-container',
  },
}

export default async function DocsMultiContainer() {
  const { default: Page } = await import('./page_.mdx');
  return <Page />;
}
