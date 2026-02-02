import React from 'react';
import { Flex, Box } from '@radix-ui/themes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React strawberry toast',
  description: 'React strawberry toast documentation',
  openGraph: {
    title: 'React strawberry toast',
    description: 'React strawberry toast documentation',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast'
  },
};

export default async function Home() {
  const { default: Page } = await import('./page_.mdx');

  return (
    <React.Fragment>
      <Flex justify="center" px="4">
        <Box style={{ width: '100%', maxWidth: '648px' }}>
          <Page />
        </Box>
      </Flex>
    </React.Fragment>
  );
}
