import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Text, Button, styled } from '@nolmungshemung/ui-kits';

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
    </>
  );
};

export default Login;
