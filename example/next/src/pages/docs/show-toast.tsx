import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';

export default function DocShowToast() {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold pb-4">Show Toast</h1>
    </React.Fragment>
  )

}

DocShowToast.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
