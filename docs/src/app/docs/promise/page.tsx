import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { ToastContainer } from 'react-strawberry-toast';
import Strong from '@/components/strong';
import { Docs } from '@/components/docs-title';
import ShowPromiseButton from '@/app/docs/promise/_components/show-promise';
import { Table } from '@/components/table';
import { promiseTableData } from '@/constants/table-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promise Docs | react-strawberry-toast',
};

export default function DocPromise() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Promise</Docs.MainTitle>
      <p>
        <Strong>toast.promise</Strong> receives the status of the promis and displays the loading before resolve, reject, and
        updates the data of the toast when the promis is fulfilled.
      </p>

      <Docs.SpaceMd />
      <Docs.SubTitle>Usage</Docs.SubTitle>

      <Docs.SpaceSm />
      <ShowPromiseButton />
      <Docs.SpaceSm />

      <PrismLight language="jsx" style={CodeTheme}>
{`import { toast } from 'react-strawberry-toast';

function ShowPromiseButton() {
  const onClick = () => {
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(123), 3_000);
    });

    toast.promise(promise, {
      loading: 'loading',
      success: (res) => <div>resolved value: {res}</div>,
      error: 'error',
    });
  };

  return (
    <button type="button" onClick={onClick}>
      show promise
    </button>
  );
}`}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SubTitle>Props</Docs.SubTitle>
      <Table headers={promiseTableData.header} body={promiseTableData.body} />

      <Docs.SpaceMd />
      <Docs.SubTitle>Headless</Docs.SubTitle>
      <p>
        You can handle promise with the headless hook.
      </p>
      <Docs.SpaceSm />

      <PrismLight language="jsx" style={CodeTheme}>
{`import { toast } from 'react-strawberry-toast/dist/headless';

function ShowPromiseButton() {
  const onClick = () => {
    const toastId = toast('loading');

    const promise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(123), 3_000);
    });

    promise.then((res) => {
      toast.replace(toastId, <div>{res}</div>);
    }).catch(() => {
      toast.replace(toastId, 'error');
    });
  };

  return (
    <button type="button" onClick={onClick}>
      show promise
    </button>
  );
}`}
      </PrismLight>

      <ToastContainer />
    </React.Fragment>
  );
}
