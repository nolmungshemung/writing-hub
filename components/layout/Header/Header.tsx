import { AppBar, Text, Button, Box, styled } from '@nolmungshemung/ui-kits';
import Router from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { WritingHubSession } from '~/data/user/user.model';

const HeaderButton = styled(Button, {
  width: '5rem',
  padding: '0 $sp-20',
  height: '$height-md !important',
  cursor: 'pointer',
  marginRight: '$sp-12',
});

type QueryString<T = string | number> = Record<string, T>;

export function Header() {
  const { data: session } = useSession();

  const handleRouting = (pathname: string, query?: QueryString) => {
    Router.push({
      pathname,
      query,
    });
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
        {session ? (
          <>
            <HeaderButton
              size="lg"
              color="white"
              outline="black"
              onClick={() => handleRouting('/registration/username')}
              data-testid={'username-button'}
            >
              필명등록
            </HeaderButton>
            <HeaderButton
              size="lg"
              color="white"
              outline="black"
              onClick={() =>
                handleRouting('/myfeed', {
                  writerId: (session as WritingHubSession)?.user?.id ?? '',
                })
              }
              data-testid={'myfeed-button'}
            >
              내피드
            </HeaderButton>
            <HeaderButton
              size="lg"
              color="white"
              outline="black"
              onClick={signOut}
              data-testid={'logout-button'}
            >
              로그아웃
            </HeaderButton>
          </>
        ) : (
          <HeaderButton
            size="lg"
            color="white"
            outline="black"
            onClick={signIn}
            data-testid={'login-button'}
          >
            로그인
          </HeaderButton>
        )}
      </Box>
    </AppBar>
  );
}
