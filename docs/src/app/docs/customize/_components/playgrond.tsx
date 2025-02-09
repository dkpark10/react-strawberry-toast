'use client';

import { Docs } from '@/components/docs-title';
import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { ToastContainer, toast } from 'react-strawberry-toast';

export default function CustomizePlayGround() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Docs.SpaceMd />
      <button
        onClick={() => toast('toast')}
        type="button"
        className="text-white font-semibold rounded-md flex items-center justify-center w-40 h-10 shadow-md bg-straw-berry"
      >
        toast()
      </button>
      <Docs.SpaceSm />
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast('toast')`}
      </PrismLight>

      <Docs.SpaceMd />

      <button
        onClick={() => toast.custom(<span className='bg-red-500 text-white'>toast</span>)}
        type="button"
        className="text-white font-semibold rounded-md flex items-center justify-center w-40 h-10 shadow-md bg-straw-berry"
      >
        toast.custom()
      </button>
      <Docs.SpaceSm />
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.custom(<span className='bg-red-500 text-white'>toast</span>)`}
      </PrismLight>
    </React.Fragment>
  );
}
