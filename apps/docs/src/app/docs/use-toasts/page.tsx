import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { Table } from '@/components/table';
import { useToastsTableData } from '@/constants/table-data';
import { Docs } from '@/components/docs-title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'useToasts Hook API | react-strawberry-toast',
  description: 'Description of the useToast hook api',
  openGraph: {
    title: 'useToasts Hook API | react-strawberry-toast',
    description: 'Description of the useToast hook api',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/use-toasts',
  },
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
import { useToasts as useHeadlessToasts } from 'react-strawberry-toast/dist/headless;'

const toasts = useToasts();
`}
      </PrismLight>

      <Docs.SpaceSm />
      <p>The difference between the two hooks is the attribute of the toast item.</p>

      <Docs.SpaceMd />
      <Docs.SubTitle>Props</Docs.SubTitle>
      <p>The table below shows the item properties table of the list returned from the useToasts hook.
        Headless hooks don't include <b>position, containerId, pauseOnHover, toastType</b>.
      </p>
      <Docs.SpaceSm />

      <Table headers={useToastsTableData.header} body={useToastsTableData.body} />

    </React.Fragment>
  );
}
