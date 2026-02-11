import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { type PropsWithChildren, type ComponentProps } from 'react';
import { Heading, Badge, Table, Strong } from '@radix-ui/themes';
import NextLink from 'next/link';

type AnchorProps = ComponentProps<'a'>;
type ImageProps = ComponentProps<'img'>;

const components = {
  img: ({ src, alt }: ImageProps) => {
    const normalizedSrc = src?.startsWith('/') ? src.slice(1) : src;
    return (
      <img
        src={process.env.NODE_ENV === "production" ? `/react-strawberry-toast/${normalizedSrc}` : src}
        alt={alt}
      />
    )
  },

  h1: ({ children }: PropsWithChildren) => (
    <Heading as="h1" size="8" mb="4">{children}</Heading>
  ),

  h2: ({ children }: PropsWithChildren) => (
    <Heading as="h2" size="6" mb="3">{children}</Heading>
  ),

  h3: ({ children }: PropsWithChildren) => (
    <Heading as="h3" size="5" mb="2">{children}</Heading>
  ),

  h4: ({ children }: PropsWithChildren) => (
    <Heading as="h4" size="4" mb="2">{children}</Heading>
  ),

  a: ({ href, children }: AnchorProps) => (
    <Badge asChild>
      {/* @ts-ignore */}
      <NextLink href={href}>{children}</NextLink>
    </Badge>
  ),

  code: ({ children }: PropsWithChildren) => {
    const code = String(children).replace(/\n$/, "");

    return (
      <PrismLight language="jsx" style={CodeTheme} customStyle={{ fontSize: 'var(--font-size-2)' }}>
        {code}
      </PrismLight>
    );
  },

  table: ({ children }: PropsWithChildren) => (
    <Table.Root variant="surface" style={{ maxWidth: '1100px' }}>
      {children}
    </Table.Root>
  ),

  thead: ({ children }: PropsWithChildren) => (
    <Table.Header>{children}</Table.Header>
  ),

  tbody: ({ children }: PropsWithChildren) => (
    <Table.Body>{children}</Table.Body>
  ),

  tr: ({ children }: PropsWithChildren) => (
    <Table.Row>{children}</Table.Row>
  ),

  th: ({ children }: PropsWithChildren) => (
    <Table.ColumnHeaderCell>{children}</Table.ColumnHeaderCell>
  ),

  td: ({ children }: PropsWithChildren) => (
    <Table.Cell>{children}</Table.Cell>
  ),

  strong: ({ children }: PropsWithChildren) => (
    <Strong>{children}</Strong>
  ),
};

export function useMDXComponents() {
  return components
}
