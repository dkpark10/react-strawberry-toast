'use client';

import React, { useEffect, useState } from 'react';
import { Docs } from '@/components/docs-title';
import { ToastContainer, toast } from 'react-strawberry-toast';
import clsx from 'clsx';
import DOMPurify from 'dompurify';
import ProfileSvg from '/public/profile.svg';
import SendSvg from '/public/send.svg';

export default function DocsMultiContainer() {
  const [msg, setMsg] = useState('');

  const showToast = () => {
    toast.custom(
      ({ isVisible }) => (
        <div
          className={`bg-straw-berry rounded-md px-2 text-white inline-block ${clsx(
            isVisible ? 'animate-right-grow' : 'animate-left-shrink'
          )}`}
        >
          {DOMPurify.sanitize(msg)}
        </div>
      ),
      {
        align: 'left',
      }
    );
  };

  const onClick = () => {
    if (!msg) return;
    showToast();
    setMsg('');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && msg) {
        showToast();
        setMsg('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [msg]);

  return (
    <div id="profile" className="border border-gray-300 p-2 w-10/12 max-sm:w-full relative">
      <div className="flex items-center gap-2">
        <ProfileSvg />
        <div>developer</div>
      </div>

      <Docs.SpaceSm />
      <ToastContainer className="absolute flex gap-2 flex-col" />
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
          <SendSvg />
        </button>
      </div>
    </div>
  );
}
