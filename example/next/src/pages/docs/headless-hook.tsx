import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import { Docs } from '@/components/docs-title';
import { CodeTheme } from '@/constants/code-theme';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';

export default function DocsHeadlessHook() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Headless Hook</Docs.MainTitle>
      <p>
        You can customize toast through headless hooks. <br />
        useToasts returns an array of the state of the toast.
      </p>

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.headless}
      </PrismLight>
    </React.Fragment>
  );
}

DocsHeadlessHook.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
