import React from 'react';
import { Docs } from '@/components/docs-title';
import { CodeTheme } from '@/constants/code-theme';
import Strong from '@/components/strong';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';
import HeadlessExample from '@/app/docs/headless-hook/_components/headless-example';
import { Table } from '@/components/table';
import { useToastsReturnValue } from '@/constants/table-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Headless Hook | react-strawberry-toast',
  description: 'Headless-hook usage of react-strawberry-toast',
  openGraph: {
    title: 'Headless Hook | react-strawberry-toast',
    description: 'Headless-hook usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/headless-hook',
  },
};

export default function DocsHeadlessHook() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Headless Hook</Docs.MainTitle>
      <p>You can customize toast through headless hooks.</p>

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>

      <Docs.SpaceSm />
      <HeadlessExample />
      <Docs.SpaceSm />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.headless}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SubTitle>useToasts</Docs.SubTitle>
      <p>
        <Strong>useToasts</Strong> returns an array of the state of the toast. <br />
        The table below shows the properties of the returned toast array item.
      </p>

      <Docs.SpaceMd />
      <Table headers={useToastsReturnValue.header} body={useToastsReturnValue.body} />
    </React.Fragment>
  );
}
