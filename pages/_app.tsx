import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { APP_STAGE } from '~/shared/constants/environments';
import { globalCss, Box } from '@nolmungshemung/ui-kits';
import { reset } from 'stitches-reset';
import { DefaultSeo } from 'next-seo';
import { Header } from '~/components/layout';

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
    <>
      <DefaultSeo />
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Box css={{ height: '100%' }}>
            <Header />
            <Component {...pageProps} />
          </Box>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
