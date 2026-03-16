import { type PropsWithChildren } from 'react';
import { Box } from '@radix-ui/themes';

export default function PromotionLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Box height='101vh' style={{ backgroundColor: 'var(--gray-12)' }} />
      {children}
    </>
  );
}
