import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import { Docs } from '@/components/docs-title';
import { CodeTheme } from '@/constants/code-theme';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';
import HeadlessExample from '@/components/headless-example';
import { Table } from '@/components/table';
import { useToastsReturnValue } from '@/constants/table-data';

export default function DocsHeadlessHook() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Headless Hook</Docs.MainTitle>
      <p>You can customize toast through headless hooks.</p>

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>

      <Docs.SpaceSm />
      <HeadlessExample />
      <Docs.SpaceMd />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.headless}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SubTitle>useToasts</Docs.SubTitle>
      <p>
        useToasts returns an array of the state of the toast. <br />
        The table below shows the properties of the returned toast array item.
      </p>

      <Docs.SpaceMd />
      <Docs.SsubTitle>state</Docs.SsubTitle>

      <Table headers={useToastsReturnValue.header} body={useToastsReturnValue.body} />
    </React.Fragment>
  );
}

DocsHeadlessHook.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
