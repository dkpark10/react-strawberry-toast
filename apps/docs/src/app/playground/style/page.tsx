'use client';

import { toast, ToastContainer } from "@react-strawberry-toast/src";
import { Button, Flex } from "@radix-ui/themes";

export default function StylePlayGround() {
  const onClick = (styleNumber: 1 | 2 | 3 = 1) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/react-strawberry-toast' : '';
    const cssPath = `${basePath}/styles/style${styleNumber}.css`;

    document.querySelectorAll('link[href*="style"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href?.includes('strawberry-toast') || href?.includes('style')) {
        link.remove();
      }
    });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
    toast.success(`theme${styleNumber || 1} toast`);
  }

  return (
    <Flex align="center" justify="center" height="100vh" gap="2">
      <ToastContainer />
      <Button
        onClick={() => onClick()}
        radius="large"
        variant="soft"
        color="ruby"
        style={{
          boxShadow: 'var(--shadow-3)',
        }}
      >
        theme1
      </Button>

      <Button
        onClick={() => onClick(2)}
        radius="large"
        variant="soft"
        color="ruby"
        style={{
          boxShadow: 'var(--shadow-3)',
        }}
      >
        theme2
      </Button>

      <Button
        onClick={() => onClick(3)}
        radius="large"
        variant="soft"
        color="ruby"
        style={{
          boxShadow: 'var(--shadow-3)',
        }}
      >
        theme3
      </Button>
    </Flex>
  );
}