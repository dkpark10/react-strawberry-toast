import React, { type PropsWithChildren } from 'react';
import GlobalProvider from '@/components/providers/global-provider';
import 'react-strawberry-toast/dist/style.css';
import { PrismLight } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import type { Metadata } from 'next'
import { Flex, Container, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '@/styles/global.css';

PrismLight.registerLanguage('jsx', jsx);

export const metadata: Metadata = {
  icons: '/react-strawberry-toast/favicon.ico',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children}
          <Container mt="9" asChild size="4" height="240px" style={{ backgroundColor: 'var(--gray-12)' }}>
            <footer>
              <Flex justify="center" align="center" py="9" height="100%">
                <Text style={{ color: 'var(--gray-1)' }}>@Created by dkpark10</Text>
              </Flex>
            </footer>
          </Container>
        </GlobalProvider>
      </body>
    </html>
  );
}
