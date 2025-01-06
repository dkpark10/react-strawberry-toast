import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';

export default function DocsMultiContainer() {
  return <div>123</div>;
}

DocsMultiContainer.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
