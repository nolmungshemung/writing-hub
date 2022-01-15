import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import MainLayout from '~/components/layout/DefaultLayout';
import Header from '~/components/layout/Header';
import { APP_STAGE } from '~/shared/constants/environments';
import { globalCss } from '@nolmungshemung/ui-kits';
import { reset } from 'stitches-reset';

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MainLayout>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </MainLayout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
