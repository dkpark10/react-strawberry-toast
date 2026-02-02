'use client';

import React, { useRef } from 'react';
import { ToastContainer, toast } from '@react-strawberry-toast/src';
import { Button, Flex, Box } from "@radix-ui/themes";

export default function TargetPlayGround() {
  const elementRef = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    toast.success('This toast is positioned 30px away from the target in both directions.', {
      containerId: 'target',
      target: {
        element: elementRef.current!,
        offset: [30, 30],
      },
    });
  };

  return (
    <React.Fragment>
      <ToastContainer containerId='target' />
      <Box p="4" style={{ border: '1px solid var(--gray-6)' }}>
        <Flex align="center" justify="center" gap="4" height="160px">
          <Button
            ref={elementRef}
            onClick={onClick}
            radius="large"
            variant="soft"
            color="ruby"
            style={{
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-3)',
            }}
          >
            target
          </Button>
        </Flex>
      </Box>
    </React.Fragment>
  );
}
