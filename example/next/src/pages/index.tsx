import Head from 'next/head';
import React from 'react';
import { ToastContainer, toast } from '../../../../src';

export default function Home() {
  const click = () => {
    toast.success('success', { timeOut: 2_000 });
    toast.error('error', { timeOut: 2_000 });
    toast.warn('warn', { timeOut: 2_000 });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div onClick={click}>
        click
      </div>
      <ToastContainer />
    </>
  );
}