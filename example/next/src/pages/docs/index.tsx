import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import Code from '@/components/code';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import { ToastContainer } from 'react-strawberry-toast';
export default function DocsIndexPage() {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold pb-4">Get Started</h1>
      <h3 className="text-lg font-semibold py-4">npm</h3>
      <Code>npm i react-strawberry-toast</Code>

      <h3 className="text-lg font-semibold py-4">yarn</h3>
      <Code>yarn add react-strawberry-toast</Code>

      <h3 className="text-lg font-semibold py-4">pnpm</h3>
      <Code>pnpm i react-strawberry-toast</Code>
      
      <h2 className="pt-10 text-2xl font-bold">code</h2>
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
