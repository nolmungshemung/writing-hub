import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { APP_STAGE } from '~/shared/constants/environments';
import { globalCss } from '@nolmungshemung/ui-kits';
import { reset } from 'stitches-reset';
import { SessionProvider } from 'next-auth/react';

globalCss({
  ...reset,
  html: {
    height: '100%',
  },
  body: {
    ...reset.body,
    height: '100%',
    fontFamily: '$noto',
  },
  '#__next': {
    height: '100%',
  },
})();

if (APP_STAGE !== 'prod') {
  require('../mocks');
}

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
