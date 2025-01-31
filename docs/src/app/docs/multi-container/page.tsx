import React from 'react';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import HomePlayGround from '@/app/docs/multi-container/_components/playground';
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

export default function DocsMultiContainer() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Multi Container</Docs.MainTitle>
      <p>
        You can use multi-containers when you set an ID for a container. When using multi-containers, they
        are shown in the container location, not in the existing top-left, top-center, top-right, bottom-left,
        bottom-center, bottom-right location.
      </p>

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>
      <Docs.SpaceMd />

      <HomePlayGround />
      <Docs.SpaceMd />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.multiContainer}
      </PrismLight>
    </React.Fragment>
  );
}
