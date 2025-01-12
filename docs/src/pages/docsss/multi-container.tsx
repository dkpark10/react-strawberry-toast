'use client';

import React, { useState, type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-strawberry-toast';
import clsx from 'clsx';
import Head from 'next/head';

export default function DocsMultiContainer() {
  const [msg, setMsg] = useState('');

  const onClick = () => {
    if (!msg) return;
    toast.custom(
      ({ isVisible }) => (
        <div
          role="alert"
          className={`bg-straw-berry rounded-md px-2 text-white ${clsx(
            isVisible ? 'animate-right-grow' : 'animate-left-shrink'
          )}`}
        >
          {msg}
        </div>
      ),
      {
        containerId: '1',
      }
    );
    setMsg('');
  };

  return (
    <React.Fragment>
      <Head>
        <title>Multi Container Docs | react-strawberry-toast</title>
      </Head>
      <Docs.MainTitle>Multi Container</Docs.MainTitle>
      <p>
        You can use multi-containers when you set an ID for a container. When using multi-containers, they
        are shown in the container location, not in the existing top-left, top-center, top-right, bottom-left,
        bottom-center, bottom-right location.
      </p>

      <Docs.SpaceMd />
      <Docs.SubTitle>usage</Docs.SubTitle>
      <Docs.SpaceMd />

      <div id="profile" className="border border-gray-300 p-2 w-10/12">
        <div className="flex items-center gap-2">
          <Image src="/profile.svg" width={34} height={34} alt="profile icon" />
          <div>developer</div>
        </div>

        <Docs.SpaceSm />
        <ToastContainer containerId="1" />
        <Docs.SpaceMd />
        <Docs.SpaceMd />

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full border border-gray-300 px-1"
            placeholder="type a message"
          />
          <button type="button" onClick={onClick}>
            <Image src="/send.svg" width={24} height={24} alt="send icon" />
          </button>
        </div>
      </div>

      <Docs.SpaceMd />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.multiContainer}
      </PrismLight>
    </React.Fragment>
  );
}

DocsMultiContainer.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
