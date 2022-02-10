import { AppBar, Text, Button, Box, styled } from '@nolmungshemung/ui-kits';
import Router from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

const HeaderButton = styled(Button, {
  width: '5rem',
  padding: '0 $sp-20',
  height: '$height-md !important',
  cursor: 'pointer',
  marginRight: '$sp-12',
});

export function Header() {
  const { data: sessionData } = useSession();
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
        {sessionData && (
          <>
            <HeaderButton size="lg" color="white" outline="black">
              필명등록
            </HeaderButton>
            <HeaderButton size="lg" color="white" outline="black">
              내피드
            </HeaderButton>
          </>
        )}
        {sessionData ? (
          <HeaderButton
            size="lg"
            color="white"
            outline="black"
            onClick={signOut}
          >
            로그아웃
          </HeaderButton>
        ) : (
          <HeaderButton
            size="lg"
            color="white"
            outline="black"
            onClick={signIn}
          >
            로그인
          </HeaderButton>
        )}
      </Box>
    </AppBar>
  );
}
