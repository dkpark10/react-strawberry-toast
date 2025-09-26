'use client';

import { Docs } from '@/components/docs-title';
import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { ToastContainer, toast } from '@react-strawberry-toast/src';
import PlayGroundButton from '@/components/playground-button';

export default function CustomizePlayGround() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Docs.SpaceMd />
      <PlayGroundButton onClick={() => toast('toast')}>toast()</PlayGroundButton>
      <Docs.SpaceSm />
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast('toast')`}
      </PrismLight>

      <Docs.SpaceMd />

      <PlayGroundButton onClick={() => toast.custom(<span className="bg-red-500 text-white">toast</span>)}>
        toast.custom()
      </PlayGroundButton>
      <Docs.SpaceSm />
      <PrismLight language="jsx" style={CodeTheme}>
        {`toast.custom(<span className='bg-red-500 text-white'>toast</span>)`}
      </PrismLight>
    </React.Fragment>
  );
}
