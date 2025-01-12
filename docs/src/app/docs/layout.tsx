import Head from 'next/head';
import Link from 'next/link';
import Github from '@/components/github';
import { PrismLight } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import type { PropsWithChildren } from 'react';

PrismLight.registerLanguage('jsx', jsx);

function DocsLinkItem({ href, children }: { href: string } & PropsWithChildren) {
  return (
    <li className="py-1 text-base font-medium hover:text-straw-berry hover:opacity-55">
      <Link href={href}>{children}</Link>
    </li>
  );
}

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
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
        <div id="layout-container" className="flex">
          <nav className="w-56">
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

          <main id="docs-main" className="w-7/12">
            {children}
          </main>
        </div>
      </aside>
    </>
  );
}
