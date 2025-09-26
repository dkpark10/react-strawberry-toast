import React from 'react';
import ShellCode from '@/components/shell-code';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import { ToastContainer } from '@react-strawberry-toast/src';
import { Docs } from '@/components/docs-title';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started | react-strawberry-toast',
  description: 'Explanation of the basic usage of react-strawberry-toast',
  openGraph: {
    title: 'Get Started Docs | react-strawberry-toast',
    description: 'Explanation of the basic usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs',
  },
};

export default function DocsIndexPage() {
  return (
    <React.Fragment>
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

      <ToastContainer containerId='code' />
    </React.Fragment>
  );
}
