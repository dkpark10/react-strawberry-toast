import React, { type ReactElement } from 'react';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import HomePlayGround from '@/app/docs/multi-container/_components/playground';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Multi Container Docs | react-strawberry-toast',
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
