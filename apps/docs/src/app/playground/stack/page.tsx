'use client';

import { toast, ToastContainer } from '@react-strawberry-toast/src';
import { Button, Flex } from "@radix-ui/themes";

export default function StackPlayground() {
  const showToast = () => {
    toast.success('success');
    toast.success('success', {
      position: 'bottom-center',
    });
  };

  return (
    <>
      <ToastContainer stack />
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
