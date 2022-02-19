import type { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Text, Button } from '@nolmungshemung/ui-kits';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

function Login() {
  const router = useRouter();
  const { callbackUrl: urlParam } = router.query;

  const onLoginButtonClick = useCallback(() => {
    const callbackUrl = typeof urlParam === 'object' ? urlParam[0] : urlParam;
    signIn('kakao', { callbackUrl });
  }, [urlParam]);

  return (
    <>
      <NextSeo
        title="WritingHub: 로그인"
        description="라이팅허브 로그인 화면"
      />
      <Box
        css={{
          height: 'calc(100% - $height-appbar)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box css={{ marginBottom: '$sp-50' }}>
          <Text css={{ fontSize: '5rem' }}>WritingHub</Text>
        </Box>
        <Box>
          <Button
            size="lg"
            color="white"
            css={{
              paddingLeft: '14rem',
              paddingRight: '14rem',
              height: '$height-appbar',
              cursor: 'pointer',
              borderRadius: '15px',
              backgroundColor: '#F4DC01',
            }}
            onClick={onLoginButtonClick}
          >
            <Text size="xl" css={{ fontWeight: '$bold' }}>
              카카오톡 로그인
            </Text>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    return {
      props: {
        session: await getSession(context),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

Login.auth = false;
export default Login;
