import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import Head from 'next/head';
import HomePlayGround from '@/app/docs/multi-container/_components/playground';

export default function DocsMultiContainer() {
  return (
    <React.Fragment>
      <Head>
        <title>Multi Container Docs | react-strawberry-toast</title>
      </Head>
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

DocsMultiContainer.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
