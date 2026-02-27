'use client';

import { toast, ToastContainer } from '@react-strawberry-toast/src';
import { Button, Flex } from "@radix-ui/themes";

export default function TypePlayground() {
  const showToast = () => {
    toast.success('success');
    toast.warn('warn');
    toast.error('error');
    toast.info('info');
    toast.custom('custom');
    toast.loading('loading');
  };

  return (
    <>
      <ToastContainer />
      <Flex align="center" justify="center" height="100vh">
        <Button
          onClick={showToast}
          radius="large"
          variant="soft"
          color="ruby"
          style={{
            boxShadow: 'var(--shadow-3)',
          }}
        >
          toast
        </Button>
      </Flex>
    </>
  );
}
