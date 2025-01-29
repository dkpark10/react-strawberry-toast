import React from 'react';
import { Docs } from '@/components/docs-title';
import { Table } from '@/components/table';
import { toastContainerApi } from '@/constants/table-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Container API Docs | react-strawberry-toast',
};

export default function DocApiToastContainer() {
  return (
    <React.Fragment>
      <Docs.MainTitle>{'<ToastContainer>'}</Docs.MainTitle>

      <Docs.SubTitle>Props</Docs.SubTitle>
      <Table headers={toastContainerApi.header} body={toastContainerApi.body} />
      <div className="lg:pb-60 xl:pb-80" />
    </React.Fragment>
  );
}
