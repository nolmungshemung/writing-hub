import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box, AppBar, Text, Button, styled } from '@nolmungshemung/ui-kits';

const GuideText = styled(Text, {
  color: '$gray',
  paddingRight: '$sp-16',
  fontWeight: '$regular',
});

const Login: NextPage = function () {
  return (
    <>
      <NextSeo
        title="WritingHub: 로그인"
        description="라이팅허브 로그인 화면"
      />
      <Box css={{ height: '100%' }}>
        <AppBar
          sticky={true}
          css={{
            paddingTop: '$sp-16',
            justifyContent: 'space-around',
            borderBottom: '1px solid $gray',
          }}
        >
          <Text
            weight="bold"
            css={{
              color: '#333333',
            }}
          >
            Writing Hub
          </Text>
          <Button
            size="lg"
            color="white"
            outline="black"
            css={{
              paddingLeft: '$sp-20',
              paddingRight: '$sp-20',
              height: '$height-md',
              cursor: 'pointer',
            }}
          >
            로그인
          </Button>
        </AppBar>
        <Box
          css={{
            height: 'calc(100% - $height-appbar)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box css={{ marginBottom: '8rem' }}>
            <Text css={{ fontSize: '5rem' }}>WritingHub</Text>
          </Box>
          <Box css={{ marginBottom: '$sp-32' }}>
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
            >
              <Text size="xl" css={{ fontWeight: '$bold' }}>
                카카오톡 로그인
              </Text>
            </Button>
          </Box>
          <Box>
            <GuideText size="xl">라이팅허브가 처음이신가요?</GuideText>
            <GuideText
              size="xl"
              css={{
                color: '#333333',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              회원가입
            </GuideText>
            <GuideText
              size="xl"
              css={{
                color: '#000000',
                cursor: 'pointer',
              }}
            >
              계정찾기
            </GuideText>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
