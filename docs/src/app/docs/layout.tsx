import Link from 'next/link';
import Github from '@/components/github';
import { PrismLight } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { type PropsWithChildren } from 'react';

PrismLight.registerLanguage('jsx', jsx);

function DocsLinkItem({ href, children }: { href: string } & PropsWithChildren) {
  return (
    <li className="py-1 text-base font-medium hover:text-straw-berry opacity-75">
      <Link href={href}>{children}</Link>
    </li>
  );
}

function Menus() {
  return (
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
            <DocsLinkItem href="/docs/styling">Styling</DocsLinkItem>
            <DocsLinkItem href="/docs/multi-container">Multi Container</DocsLinkItem>
            <DocsLinkItem href="/docs/promise">Promise</DocsLinkItem>
            <DocsLinkItem href="/docs/headless-hook">Headless Hook</DocsLinkItem>
          </ul>
        </li>
        <li>
          <h3 className="pt-3">API</h3>
          <ul className="ml-2">
            <DocsLinkItem href="/docs/toast-container">toastContainer</DocsLinkItem>
            <DocsLinkItem href="/docs/toast">toast</DocsLinkItem>
            <DocsLinkItem href="/docs/use-toasts">useToasts</DocsLinkItem>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="w-full h-14 fixed bg-primary-white z-10 sm:pr-5">
        <div className="py-3 pr-5 flex justify-between ">
          <div className="flex">
            <Link href="/">
              <b className="font-bold text-xl">
                React <span className="text-straw-berry">Strawberry</span> Toast
              </b>
            </Link>
          </div>
          <Link href="https://github.com/dkpark10/react-strawberry-toast">
            <Github />
          </Link>
        </div>
        <div className="-mx-5 h-[2px] bg-[#ececec]" />
      </header>
      

      <div className="pt-16 sm:hidden">
        <Menus />
      </div>

      <div className="pt-16">
        <aside id="layout-container" className="flex max-sm:hidden fixed">
         <Menus />
        </aside>

        <main id="docs-main" className="sm:w-7/12 sm:ml-56">
          {children}
        </main>
      </div>
    </>
  );
}
