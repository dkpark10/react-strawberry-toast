import React, { type ReactElement } from 'react';
import { Docs } from '@/components/docs-title';
import DocsLayout from '@/components/docs-layout';
import { Table } from '@/components/table';
import { toastContainerApi } from '@/constants/table-data';
export default function DocApiToastContainer() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Toast Container</Docs.MainTitle>

      <Docs.SubTitle>Props</Docs.SubTitle>
      <Docs.SpaceSm />

      <Table headers={toastContainerApi.header} body={toastContainerApi.body} />
    </React.Fragment>
  );
}

DocApiToastContainer.getLayout = function getLayout(page: ReactElement) {
  return (
    <DocsLayout>
      <div className="lg:pb-60 xl:pb-80">{page}</div>
    </DocsLayout>
  );
};
