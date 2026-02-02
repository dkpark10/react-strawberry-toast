'use client';

import { toast } from "@react-strawberry-toast/src";
import { Button, Flex, Box } from "@radix-ui/themes";

export default function StylingButtonGroups() {
  const onClick = (styleNumber: 2 | 3) => {
    const cssPath = process.env.NODE_ENV === 
      'development' ? `/style${styleNumber}.css` : `/react-strawberry-toast/style${styleNumber}.css`;

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
    toast.success('theme2');
  }

  return (
    <Box p="4" style={{ border: '1px solid var(--gray-6)' }}>
      <Flex align="center" justify="center" gap="4" height="160px">
        <Button
          onClick={() => onClick(2)}
          radius="large"
          variant="soft"
          color="ruby"
          style={{
            backgroundColor: 'white',
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
            backgroundColor: 'white',
            boxShadow: 'var(--shadow-3)',
          }}
        >
          theme3
        </Button>
      </Flex>
    </Box>
  );
}