import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import SyntaxHighlight from '@/components/syntax-hilight';
import { Docs } from '@/components/docs-title';

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

      <Docs.SsubTitle>success</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.success('success')`}
      </PrismLight>

      <Docs.SsubTitle>error</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.error('error')`}
      </PrismLight>

      <Docs.SsubTitle>warn</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.warn('warn')`}
      </PrismLight>

      <Docs.SsubTitle>loading</Docs.SsubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.loading('loading')`}
      </PrismLight>

      <Docs.SubTitle>Custom Toast</Docs.SubTitle>

      <Docs.SsubTitle>Props</Docs.SsubTitle>

      <p>
        Basic toast can be customized in the form of a function. Basic style and animation are applied. <br />
        If you don't want this, use <SyntaxHighlight>toast.custom</SyntaxHighlight>
      </p>
      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.custom}
      </PrismLight>
      
      <Docs.SpaceMd />

      <Docs.SsubTitle>close function</Docs.SsubTitle>
      <p>
        Toast disappears <SyntaxHighlight>3000ms</SyntaxHighlight> after mounting and is completely removed
        from the toast list after <SyntaxHighlight>200ms</SyntaxHighlight>.<br />
        This was intentionally removed after 200 ms for animation application when unmounted. <br />
        If you want to remove it immediately, use <SyntaxHighlight>immediatelyClose</SyntaxHighlight> props
        function.
      </p>

      <PrismLight language="jsx" style={CodeTheme}>
        {`toast(({ immediatelyClose }) => <div onClick={immediatelyClose}>...</div>)`}
      </PrismLight>

      <Docs.SpaceSm />
      <Docs.SsubTitle>icons</Docs.SsubTitle>
      <p>You can receive and render icons used in success, error, warn, loading as props.</p>

      <PrismLight language="jsx" style={CodeTheme}>
        {`toast(({ icons }) => <div>{icons.success}</div>)`}
      </PrismLight>
    </React.Fragment>
  );
}

DocShowToast.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
