import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import SyntaxHighlight from '@/components/syntax-hilight';
import { Docs } from '@/components/docs-title';
import { Table } from '@/components/table';
import { customToastPropsTableData } from '@/constants/table-data';

export default function DocsHeadlessHook() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Headless Hook</Docs.MainTitle>
    </React.Fragment>
    
  )
}

DocsHeadlessHook.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
