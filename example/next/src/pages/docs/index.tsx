import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import ShellCode from '@/components/shell-code';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import { ToastContainer } from 'react-strawberry-toast';
import { Docs } from '@/components/docs-title';
export default function DocsIndexPage() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Get Started</Docs.MainTitle>
      <Docs.SsubTitle>npm</Docs.SsubTitle>
      <Docs.SpaceSm />
      <ShellCode>npm i react-strawberry-toast</ShellCode>
      <Docs.SpaceSm />

      <Docs.SsubTitle>yarn</Docs.SsubTitle>
      <Docs.SpaceSm />
      <ShellCode>yarn add react-strawberry-toast</ShellCode>
      <Docs.SpaceSm />

      <Docs.SsubTitle>pnpm</Docs.SsubTitle>
      <Docs.SpaceSm />
      <ShellCode>pnpm i react-strawberry-toast</ShellCode>
      <Docs.SpaceSm />

      <Docs.SpaceSm />
      <Docs.SubTitle>code</Docs.SubTitle>
      <SyntaxHighlighter language="jsx" style={CodeTheme}>
        {codeSyntax['started']}
      </SyntaxHighlighter>

      <ToastContainer />
    </React.Fragment>
  );
}

DocsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
