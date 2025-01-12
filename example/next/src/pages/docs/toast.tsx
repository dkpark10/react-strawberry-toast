import React, { type ReactElement } from 'react';
import { Docs } from '@/components/docs-title';
import DocsLayout from '@/components/docs-layout';
import { Table } from '@/components/table';
import { toastApi } from '@/constants/table-data';
import Head from 'next/head';
export default function DocApiToast() {
  return (
    <React.Fragment>
      <Head>
        <title>Toast API Docs | react-strawberry-toast</title>
      </Head>
      <Docs.MainTitle>Toast</Docs.MainTitle>

      <Docs.SubTitle>Props</Docs.SubTitle>
      <Docs.SpaceSm />

      <Table headers={toastApi.header} body={toastApi.body} />
    </React.Fragment>
  );
}

DocApiToast.getLayout = function getLayout(page: ReactElement) {
  return (
    <DocsLayout>
      <div className="lg:pb-30 xl:pb-40">{page}</div>
    </DocsLayout>
  );
};
