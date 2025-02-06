import React from 'react';
import { Docs } from '@/components/docs-title';
import Link from 'next/link';
import { CodeTheme } from '@/constants/code-theme';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';
import MultiContainerPlayGround from '@/app/docs/multi-container/_components/playground';
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
      <p>You can customize the style.</p>
      <Docs.SpaceMd />

      <Docs.SubTitle>CSS</Docs.SubTitle>
      <p>
        This is the CSS file used for the react-strawberry-toast. <br />
        <Link href="https://github.com/dkpark10/react-strawberry-toast/blob/master/src/styles/style.scss">
          here is <b className="text-straw-berry">CSS file link</b>
        </Link>
      </p>

      <PrismLight language="css" style={CodeTheme}>
        {`$react-strawberry-toast-namespace: 'react-strawberry-toast';
$offset: 16px;

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}

@keyframes react-strawberry-toast_fade-in {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes react-strawberry-toast_fade-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes react-strawberry-toast_fade-in-reverse {
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes react-strawberry-toast_fade-out-reverse {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

.#{$react-strawberry-toast-namespace}__z9999 {
  z-index: 9999;
}

.#{$react-strawberry-toast-namespace}__toast-container {
  pointer-events: auto;
  position: fixed;
  z-index: 9999;
  display: flex;
}

.#{$react-strawberry-toast-namespace}__top-left {
  top: $offset;
  left: $offset;
}

.#{$react-strawberry-toast-namespace}__top-center {
  top: $offset;
  left: 50%;
  transform: translateX(-50%);
}

.#{$react-strawberry-toast-namespace}__top-right {
  top: $offset;
  right: $offset;
}

.#{$react-strawberry-toast-namespace}__bottom-left {
  bottom: $offset;
  left: $offset;
}

.#{$react-strawberry-toast-namespace}__bottom-center {
  bottom: $offset;
  left: 50%;
  transform: translateX(-50%);
}

.#{$react-strawberry-toast-namespace}__bottom-right {
  bottom: $offset;
  right: $offset;
}

.#{$react-strawberry-toast-namespace}__toast {
  display: flex;
}
.#{$react-strawberry-toast-namespace}__toast-center {
  display: flex;
  justify-content: center;
}
.#{$react-strawberry-toast-namespace}__toast-content {
  box-sizing: border-box;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 8px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 47px;
}
.#{$react-strawberry-toast-namespace}__toast-icon {
  width: 20px;
}

.#{$react-strawberry-toast-namespace}__fade-in {
  animation: react-strawberry-toast_fade-in 0.3s ease-out;
}

.#{$react-strawberry-toast-namespace}__fade-out {
  animation: react-strawberry-toast_fade-out 0.3s ease-out;
}

.#{$react-strawberry-toast-namespace}__fade-in-reverse {
  animation: react-strawberry-toast_fade-in-reverse 0.3s ease-out;
}

.#{$react-strawberry-toast-namespace}__fade-out-reverse {
  animation: react-strawberry-toast_fade-out-reverse 0.3s ease-out;
}

.#{$react-strawberry-toast-namespace}__loading {
  width: 18px;
  padding: 3.5px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #6f6f70;
  --_m: conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
          
`}
      </PrismLight>

      <Docs.SpaceMd />
      <p>
        The image below shows the class assigned to the element when the toast is displayed. <br />
        The text highlighted in red is a dynamic class determined by the position of the toast.
      </p>

      <AssetImage
        className="relative left-[-1px]"
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
        <p>
          If you set className or style, the previously applied className and style will be completely reset.
        </p>
      </div>
      <Docs.SpaceLg />

      <p>
        The <b>{'<ToastContainer />'}</b> provides className and style as options.
      </p>

      <p>
        The example below is code that changes the position of the existing toast container using Tailwind. <br />
        Type a Message
      </p>
      <Docs.SpaceMd />

      <MultiContainerPlayGround />
      <Docs.SpaceMd />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.containerStyling}
      </PrismLight>
    </React.Fragment>
  );
}
