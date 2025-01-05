import Head from 'next/head';
import Link from 'next/link';
import Github from '@/components/github';
import { PropsWithChildren } from 'react';

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
                <Link href="/">Get Started</Link>
              </li>
              <li>
                <Link href="/docs/guides">Guides</Link>
              </li>
              <li>
                <Link href="/docs/api">API</Link>
              </li>
            </ul>
          </nav>

          <main>{children}</main>
        </div>
      </aside>
    </>
  );
}
