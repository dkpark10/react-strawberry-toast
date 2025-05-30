/** @jsxImportSource @emotion/react */
'use client';

import { type PropsWithChildren } from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';

PrismLight.registerLanguage('jsx', jsx);

export default function GlobalProvider({ children }: PropsWithChildren) {
  return <div className="sm:px-5 max-sm:px-2">{children}</div>;
}
