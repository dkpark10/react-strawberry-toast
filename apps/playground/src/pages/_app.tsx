import type { AppProps } from 'next/app';
import createCache from '@emotion/cache';
import { css, Global, CacheProvider } from '@emotion/react';

const cache = createCache({ key: 'strawberry' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
        `}
      />
      <Component {...pageProps} />
    </CacheProvider>
  );
}
