import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import Strong from '@/components/strong';
import Link from 'next/link';
import { Docs } from '@/components/docs-title';
import { Table } from '@/components/table';
import { customToastPropsTableData } from '@/constants/table-data';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Show Toast Docs | react-strawberry-toast',
}

export default function DocShowToast() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Show Toast</Docs.MainTitle>
      <Docs.SubTitle>Various Toast Functions</Docs.SubTitle>
      <p>
        It provides a toast function with various icons as well as basic toast. <br />
        Data from functions other than default receives only the jsx element as a parameter.
      </p>
      <Docs.SpaceMd />

      <Docs.SsubTitle>default</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast('default')`}
      </PrismLight>
      <Docs.SpaceMd />

      <Docs.SsubTitle>success</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.success('success')`}
      </PrismLight>
      <Docs.SpaceMd />

      <Docs.SsubTitle>error</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.error('error')`}
      </PrismLight>
      <Docs.SpaceMd />

      <Docs.SsubTitle>warn</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.warn('warn')`}
      </PrismLight>
      <Docs.SpaceMd />

      <Docs.SsubTitle>loading</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.loading('loading')`}
      </PrismLight>
      <Docs.SpaceMd />

      <Docs.SsubTitle>promise</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.promise(promise, {
  loading: 'loading',           
  success: 'success',
  error: 'error',
});                     
`}
      </PrismLight>
      <Docs.SpaceSm />
      <p>For more detailed promise information, please refer to the <Link href='/docs/promise'><b className="text-straw-berry">promise</b></Link> page</p>

      <Docs.SpaceLg />
      <Docs.SubTitle>Custom Toast</Docs.SubTitle>
      <Docs.SpaceMd />

      <Docs.SsubTitle>Props</Docs.SsubTitle>
      <Table headers={customToastPropsTableData.header} body={customToastPropsTableData.body} />

      <Docs.SpaceLg />

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
        Toast disappears <Strong>3000ms</Strong> after mounting and is completely removed
        from the toast list after <Strong>200ms</Strong>. This was intentionally removed
        after 200 ms for animation application when unmounted. If you want to remove it immediately, use{' '}
        <Strong>immediatelyClose</Strong> props function.
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
    </React.Fragment>
  );
}
