import React from 'react';
import { Docs } from '@/components/docs-title';
import Link from 'next/link';
import { CodeTheme } from '@/constants/code-theme';
import { PrismLight } from 'react-syntax-highlighter';
import WarnSvg from '/public/warn.svg';
import type { Metadata } from 'next';
import AssetImage from '@/components/asset-image';

export const metadata: Metadata = {
  title: 'Styling | react-strawberry-toast',
  description: 'Styling of react-strawberry-toast',
  openGraph: {
    title: 'Styling | react-strawberry-toast',
    description: 'Styling of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/styling',
  },
};

export default function DocsHeadlessHook() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Styling</Docs.MainTitle>

      <Docs.SubTitle>CSS</Docs.SubTitle>
      <p>
        This is the CSS classes used for the react-strawberry-toast. <br />
        <Link href="https://github.com/dkpark10/react-strawberry-toast/blob/master/src/styles/style.scss">
          Here is <b className="text-straw-berry">CSS file link</b>
        </Link>
      </p>

      <PrismLight language="css" style={CodeTheme}>
        {`$react-strawberry-toast-namespace: 'react-strawberry-toast';
$offset: 16px;
$react-strawberry-toast-success: #1dca82;
$react-strawberry-toast-error: #eb2639;
$react-strawberry-toast-warn: #fcba03;

.#{$react-strawberry-toast-namespace}__z9999 {}

.#{$react-strawberry-toast-namespace}__toast-container {}

.#{$react-strawberry-toast-namespace}__top-left {}

.#{$react-strawberry-toast-namespace}__top-center {}

.#{$react-strawberry-toast-namespace}__top-right {}

.#{$react-strawberry-toast-namespace}__bottom-left {}

.#{$react-strawberry-toast-namespace}__bottom-center {}

.#{$react-strawberry-toast-namespace}__bottom-right {}

.#{$react-strawberry-toast-namespace}__toast-content-container {}

.#{$react-strawberry-toast-namespace}__toast-content {}

.#{$react-strawberry-toast-namespace}__toast-icon {}

.#{$react-strawberry-toast-namespace}__fade-in {}

.#{$react-strawberry-toast-namespace}__fade-out {}

.#{$react-strawberry-toast-namespace}__fade-in-reverse {}

.#{$react-strawberry-toast-namespace}__fade-out-reverse {}

.#{$react-strawberry-toast-namespace}__loading {}
`}
      </PrismLight>

      <Docs.SpaceMd />
      <p>
        The image below shows the class assigned to the element when the toast is displayed. <br />
        The text highlighted in red is a dynamic class determined by the position of the toast.
      </p>

      <AssetImage
        className="relative left-[-4px]"
        src="/toast-structure.png"
        alt="toast-structure"
        width={1748}
        height={1370}
      />

      <Docs.SpaceMd />
      <Docs.SubTitle>Toast Container Styling</Docs.SubTitle>
      <Docs.SpaceSm />
      <div className="border border-gray-300 px-2 py-4">
        <div className="flex">
          <WarnSvg /> <strong>WARN</strong>
        </div>
        <p>If you set className, the previously applied className will be completely reset.</p>
      </div>
      <Docs.SpaceSm />

      <p>
        The <b>{'<ToastContainer />'}</b> and <b>toast function</b> provides className and style as options.
      </p>

      <PrismLight language="jsx" style={CodeTheme}>
        {`
    <ToastContainer style={style} className="class" />

`}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SubTitle>Toast Styling</Docs.SubTitle>
      <PrismLight language="jsx" style={CodeTheme}>
        {`
            toast('Dark Theme', {
              className: 'toast-class',
              style: {
                color: 'white',
                backgroundColor: 'black',    
                border: '1px solid white'
              },
            });

`}
      </PrismLight>
    </React.Fragment>
  );
}
