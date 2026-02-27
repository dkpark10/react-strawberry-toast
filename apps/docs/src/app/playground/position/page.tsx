'use client';

import { toast, ToastContainer, type Position } from '@react-strawberry-toast/src';
import { Button, Flex } from "@radix-ui/themes";

const positions: Position[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export default function PositionPlayground() {
  const showToast = () => {
    positions.forEach((position) => {
      toast.success(position, { 
        position,
      });

      toast.success(position + ' second toast', { 
        position,
      });
    });
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
