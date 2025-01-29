import React from 'react';
import { Docs } from '@/components/docs-title';
import { Table } from '@/components/table';
import { toastApi } from '@/constants/table-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast API Docs | react-strawberry-toast',
};

export default function DocApiToast() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Toast</Docs.MainTitle>

      <Docs.SubTitle>Props</Docs.SubTitle>
      <p>The table below shows the properties of second parameters of toast function</p>
      <Docs.SpaceSm />
      
      <Table headers={toastApi.header} body={toastApi.body} />
      <div className="lg:pb-30 xl:pb-40" />
    </React.Fragment>
  );
}
