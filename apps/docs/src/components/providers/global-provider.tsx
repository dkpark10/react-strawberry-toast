/** @jsxImportSource @emotion/react */
'use client';

import { type PropsWithChildren } from 'react';
import { Theme } from '@radix-ui/themes';

export default function GlobalProvider({ children }: PropsWithChildren) {
  return (
    <Theme 
      accentColor='ruby' 
      grayColor="gray"
      appearance='light' 
      scaling='100%'
    >
      {children}
    </Theme>
  );
}
