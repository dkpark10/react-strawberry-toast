import React from 'react';
import { Docs } from '@/components/docs-title';
import { Table } from '@/components/table';
import { toastContainerApi } from '@/constants/table-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Container API | react-strawberry-toast',
  description: 'Description of the Toast Container component options',
  openGraph: {
    title: 'Toast Container API | react-strawberry-toast',
    description: 'Description of the Toast Container component options',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/toast-container',
  },
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
