import NextLink from 'next/link';
import Github from '@/components/github';
import { type PropsWithChildren } from 'react';
import { Box, Flex, Separator, Link, Text, Container } from '@radix-ui/themes';

function DocsLinkItem({ href, children }: { href: string } & PropsWithChildren) {
  return (
    <Link asChild>
      <NextLink href={href}>
        <Text size="2" color="gray">{children}</Text>
      </NextLink>
    </Link>
  );
}

function Menus() {
  return (
    <Box pl="4">
      <Flex direction="column" gap="2" asChild>
        <ul>
          <li>
            <Link asChild>
              <NextLink href="/docs">
                <Text color="gray" highContrast weight="bold">Getting Started</Text>
              </NextLink>
            </Link>
          </li>
          <li>
            <Text color="gray" highContrast weight="bold">Guides</Text>
            <Flex direction="column" gap="1" asChild>
              <ul className="ml-2">
                <DocsLinkItem href="/docs/show-toast">Show Toast</DocsLinkItem>
                <DocsLinkItem href="/docs/customize">Customize</DocsLinkItem>
                <DocsLinkItem href="/docs/styling">Styling</DocsLinkItem>
                <DocsLinkItem href="/docs/positioning">Positioning</DocsLinkItem>
                <DocsLinkItem href="/docs/multi-container">Multi Container</DocsLinkItem>
                <DocsLinkItem href="/docs/headless-hook">Headless Hook</DocsLinkItem>
              </ul>
            </Flex>
          </li>
          <li>
            <Text color="gray" highContrast weight="bold">API</Text>
            <Flex direction="column" gap="1" asChild>
              <ul className="ml-2">
                <DocsLinkItem href="/docs/toast-container">toastContainer</DocsLinkItem>
                <DocsLinkItem href="/docs/toast">toast</DocsLinkItem>
                <DocsLinkItem href="/docs/use-toasts">useToasts</DocsLinkItem>
              </ul>
            </Flex>
          </li>
        </ul>
      </Flex>
    </Box>
  );
}

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Box
        asChild
        position="fixed"
        width="100%"
        height="56px"
        style={{ backgroundColor: 'var(--gray-1)', zIndex: 10 }}
      >
        <header>
          <Flex justify="between" py="4" px="4">
            <Link asChild>
              <NextLink href="/">
                <Text weight="bold" color="gray" highContrast>React <Text color="ruby">Strawberry</Text> Toast</Text>
              </NextLink>
            </Link>

            <Link href="https://github.com/dkpark10/react-strawberry-toast">
              <Github />
            </Link>
          </Flex>

          <Separator orientation="horizontal" size="4" />
        </header>
      </Box>

      {/* mobile */}
      <Box id="nav-mo" pt="72px" display={{ sm: 'none' }}>
        <Menus />
      </Box>

      {/* pc */}
      <Box id="nav-pc" pt="72px">
        <Box asChild position="fixed" display={{ initial: 'none', sm: 'block' }}>
          <aside id="layout-container">
            <Menus />
          </aside>
        </Box>

        <Box
          asChild
          pl={{ initial: '16px', sm: '224px', md: '224px' }}
          pr="16px"
          width={{ initial: '100%', sm: '100%', md: '960px' }}
          mb="4"
        >
          <main id="docs-main">{children}</main>
        </Box>
      </Box>
    </>
  );
}
