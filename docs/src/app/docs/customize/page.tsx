import React from 'react';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import Strong from '@/components/strong';
import { codeSyntax } from '@/constants/code-syntax';
import { Table } from '@/components/table';
import { customToastPropsTableData } from '@/constants/table-data';
import CustomizePlayGround from '@/app/docs/customize/_components/playgrond';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi Container | react-strawberry-toast',
  description: 'Multi container usage of react-strawberry-toast',
  openGraph: {
    title: 'Multi Container | react-strawberry-toast',
    description: 'Multi container usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/customize',
  },
};

export default function DocsCustomize() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Customize</Docs.MainTitle>

      <Docs.SubTitle>Callback Props</Docs.SubTitle>
      <Table headers={customToastPropsTableData.header} body={customToastPropsTableData.body} />

      <p>
        Basic toast can be customized in the form of a function. Basic style and animation are applied. If you
        don't want this, use <Strong>toast.custom</Strong>
      </p>

      <Docs.SpaceMd />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.tailwindCss}
      </PrismLight>

      <Docs.SpaceMd />

      <Docs.SsubTitle>close function</Docs.SsubTitle>
      <p>
        Toast disappears <Strong>3000ms</Strong> after mounting and is completely removed from the toast list
        after <Strong>200ms</Strong>. This was intentionally removed after 200 ms for animation application
        when unmounted. If you want to remove it immediately, use <b>immediatelyClose</b> props
        function.
      </p>

      <Docs.SpaceSm />
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast(({ immediatelyClose }) => <div onClick={immediatelyClose}>...</div>)`}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SsubTitle>icons</Docs.SsubTitle>
      <p>You can receive and render icons used in success, error, warn, loading as props.</p>

      <Docs.SpaceSm />
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast(({ icons }) => <div>{icons.success}</div>)`}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SubTitle>toast.custom</Docs.SubTitle>
      <p>
        The main difference from a <b>toast()</b> is that when using a <b>toast.custom()</b>, all default
        animations and styles are removed, allowing for more flexible customization
      </p>
      <CustomizePlayGround />
    </React.Fragment>
  );
}
