import React from 'react';
import ShellCode from '@/components/shell-code';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import { ToastContainer } from 'react-strawberry-toast';
import { Docs } from '@/components/docs-title';
import Head from 'next/head';

export default function DocsIndexPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Get Started Docs | react-strawberry-toast</title>
      </Head>
      <Docs.MainTitle>Get Started</Docs.MainTitle>
      <Docs.SsubTitle>npm</Docs.SsubTitle>
      <Docs.SpaceSm />
      <ShellCode>npm i react-strawberry-toast</ShellCode>
      <Docs.SpaceLg />

      <Docs.SsubTitle>yarn</Docs.SsubTitle>
      <Docs.SpaceSm />
      <ShellCode>yarn add react-strawberry-toast</ShellCode>
      <Docs.SpaceLg />

      <Docs.SsubTitle>pnpm</Docs.SsubTitle>
      <Docs.SpaceSm />
      <ShellCode>pnpm i react-strawberry-toast</ShellCode>
      <Docs.SpaceLg />

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax['started']}
      </PrismLight>

      <ToastContainer />
    </React.Fragment>
  );
}
