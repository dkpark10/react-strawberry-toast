'use client';

import React, { useState } from 'react';
import { Docs } from '@/components/docs-title';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-strawberry-toast';
import clsx from 'clsx';

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
  );
}
