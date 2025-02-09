import React from 'react';
import Strong from '@/components/strong';
import { Docs } from '@/components/docs-title';
import { Table } from '@/components/table';
import { toastApi } from '@/constants/table-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast API | react-strawberry-toast',
  description: 'Description of the toast function options',
  openGraph: {
    title: 'Toast API | react-strawberry-toast',
    description: 'Description of the toast function options',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/toast',
  },
};

export default function DocApiToast() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Toast</Docs.MainTitle>
      <Docs.SubTitle>Props</Docs.SubTitle>
      <p>The table below shows the properties of second parameters of toast function</p>
      <Docs.SpaceSm />
      <Table headers={toastApi.header} body={toastApi.body} />
      <Docs.SpaceMd />
      <Docs.SubTitle>Handler</Docs.SubTitle>

      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.setActive</span> : Sets the toast to an active
        state.
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.isActive</span> : Get the active state of the toast
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.disappear</span> : Disappear the toast after a
        specified time.
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.pause</span> : Pause the toast timer.
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.resume</span> : Resume the toast timer.
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.replace</span> : Replaces the data to be rendered
        for the toast.
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.remove</span> : Removes the toast from the list{' '}
        <Strong>200ms</Strong> after it disappears
      </div>
      <div className="py-1">
        <span className="bg-gray-300 p-1 rounded-md">toast.allClear</span> : Removes all toasts
      </div>
    </React.Fragment>
  );
}
