import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';

export default function DocsHeadlessHook() {
  return <div>123</div>;
}

DocsHeadlessHook.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
