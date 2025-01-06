import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';

export default function DocApiToastContainer() {
  return <div>123</div>;
}

DocApiToastContainer.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
