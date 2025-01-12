import React, { type ReactElement } from 'react';
import DocsLayout from '@/components/docs-layout';

export default function DocsCustom() {
  return <div>123</div>;
}

DocsCustom.getLayout = function getLayout(page: ReactElement) {
  return <DocsLayout>{page}</DocsLayout>;
};
