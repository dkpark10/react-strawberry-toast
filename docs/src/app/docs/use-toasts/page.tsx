import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { Docs } from '@/components/docs-title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Container API Docs | react-strawberry-toast',
};

export default function DocApiToastContainer() {
  return (
    <React.Fragment>
      <Docs.MainTitle>useToasts</Docs.MainTitle>

      <p>
        useToasts hook that provides a toasty list. <br />
        There are two hooks that are basically provided and the other is provided by Headless.
      </p>

      <Docs.SpaceMd />
      <PrismLight language="jsx" style={CodeTheme}>
        {`import { useToasts } from 'react-strawberry-toast;'
import { useToasts } from 'react-strawberry-toast/dist/headless;'`}
      </PrismLight>
    </React.Fragment>
  );
}
