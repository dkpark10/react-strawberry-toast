import React from 'react';
import { Docs } from '@/components/docs-title';
import { PrismLight } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import { codeSyntax } from '@/constants/code-syntax';
import TargetPlayGround from '@/app/docs/positioning/_components/target';
import StylingPlayGround from '@/app/docs/styling/_components/playground';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi Container | react-strawberry-toast',
  description: 'Multi container usage of react-strawberry-toast',
  openGraph: {
    title: 'Multi Container | react-strawberry-toast',
    description: 'Multi container usage of react-strawberry-toast',
    images: 'https://dkpark10.github.io/react-strawberry-toast/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast/docs/positioning',
  },
};

export default function DocsCustomize() {
  return (
    <React.Fragment>
      <Docs.MainTitle>Positioning</Docs.MainTitle>

      <p>
        Toasts can be positioned freely in addition to their default position. <br />
        There are two methods.
      </p>

      <Docs.SpaceMd />
      <Docs.SubTitle>Toast Container Styling</Docs.SubTitle>
      <p>
        The example below is code that changes the position of the existing toast container using Tailwind.{' '}
      </p>
      <Docs.SpaceSm />

      <StylingPlayGround />
      <Docs.SpaceMd />

      <PrismLight language="jsx" style={CodeTheme}>
        {codeSyntax.containerStyling}
      </PrismLight>

      <Docs.SpaceMd />
      <Docs.SubTitle>Toast target option</Docs.SubTitle>
      <TargetPlayGround />

      <PrismLight language="jsx" style={CodeTheme}>
        {`
              toast('toast target', {
                  target: {
                    element: element.current,
                    offset: [30, 30],
                  },
                }
              );
  `}
      </PrismLight>
    </React.Fragment>
  );
}