import React from 'react';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
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
        When assigning a container ID, only the toast with the same toast ID set in the toast function options is displayed.
      </p>

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.multiContainer}
      </PrismLight>
    </React.Fragment>
  );
}
