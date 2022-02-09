import { AppBar, Text, Button, Box, styled } from '@nolmungshemung/ui-kits';
import Router from 'next/router';

const HeaderButton = styled(Button, {
  width: '5rem',
  padding: '0 $sp-20',
  height: '$height-md !important',
  cursor: 'pointer',
  marginRight: '$sp-12',
});

export function Header() {
  const handleRouting = (path: string) => {
    Router.push(path);
  };

  return (
    <AppBar
      sticky={true}
      css={{
        paddingTop: '$sp-16',
        justifyContent: 'space-around',
        borderBottom: '1px solid $gray',
        height: '4rem',
      }}
    >
      <Text
        weight="bold"
        css={{
          color: '#333333',
          cursor: 'pointer',
        }}
        onClick={() => handleRouting('/')}
      >
        Writing Hub
      </Text>
      <Box>
        {/* TODO: 로그인 세션에 따라서 다르게 처리하도록 수정 필요 */}
        {/* <HeaderButton size="lg" color="white" outline="black">
          필명등록
        </HeaderButton>
        <HeaderButton size="lg" color="white" outline="black">
          로그아웃
        </HeaderButton>
        <HeaderButton size="lg" color="white" outline="black">
          내피드
        </HeaderButton> */}
        <HeaderButton
          size="lg"
          color="white"
          outline="black"
          onClick={() => handleRouting('/login')}
        >
          로그인
        </HeaderButton>
      </Box>
    </AppBar>
  );
}
