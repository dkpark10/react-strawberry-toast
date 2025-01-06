import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';

export default function DocApiToast() {
  return <div>123</div>;
}

DocApiToast.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
