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
  title: 'Show Toast | react-strawberry-toast',
  description: 'Various functions for displaying a toast',
  openGraph: {
    title: 'Show Toast | react-strawberry-toast',
    description: 'Various functions for displaying a toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/show-toast'
  },
};

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
    </React.Fragment>
  );
}
