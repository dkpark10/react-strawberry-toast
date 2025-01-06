import Head from 'next/head';
import Link from 'next/link';
import Github from '@/components/github';
import type { PropsWithChildren } from 'react';

function DocsLinkItem({ href, children }: { href: string } & PropsWithChildren) {
  return (
    <li className="py-1 text-base font-medium">
      <Link href={href}>{children}</Link>
    </li>
  );
}

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>react strawberry toast docs</title>
        <meta name="description" content="react-strawberry-toast-docs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-3 px-5 flex justify-between">
        <Link href="/">
          <div className="font-bold text-xl">
            React <span className="text-straw-berry">Strawberry</span> Toast
          </div>
        </Link>
        <Link href="https://github.com/dkpark10/react-strawberry-toast">
          <Github />
        </Link>
      </header>

      <div className="h-[2px] bg-[#ececec]" />

      <aside className="py-2 px-5">
        <div className="flex">
          <nav className="w-48">
            <ul className="font-semibold text-primary-black text-lg">
              <li>
                <h3>
                  <Link href="/docs">Get Started</Link>
                </h3>
              </li>
              <li>
                <h3 className="pt-3">Guides</h3>
                <ul className="ml-2">
                  <DocsLinkItem href="/docs/show-toast">Show Toast</DocsLinkItem>
                  <DocsLinkItem href="/docs/custom">Custom Toast</DocsLinkItem>
                  <DocsLinkItem href="/docs/multi-container">Multi Container</DocsLinkItem>
                  <DocsLinkItem href="/docs/headless-hook">Headless Hook</DocsLinkItem>
                </ul>
              </li>
              <li>
                <h3 className="pt-3">API</h3>
                <ul className="ml-2">
                  <DocsLinkItem href="/docs/toast-container">toastContainer</DocsLinkItem>
                  <DocsLinkItem href="/docs/toast">toast</DocsLinkItem>
                </ul>
              </li>
            </ul>
          </nav>

          <main>{children}</main>
        </div>
      </aside>
    </>
  );
}
