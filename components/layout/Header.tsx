import Link from 'next/link';
import { Text, Button, AppBar } from '@nolmungshemung/ui-kits';
import { styled } from '../../stitches.config';

const StyledAppBar = styled(AppBar, {
  gridArea: 'header',
  display: 'flex',
  alignItems: 'center',
  borderBottom: 'solid 1px $gray',
  ':nth-child(1)': {
    marginLeft: '22.5rem',
  },
  ':nth-child(2)': {
    marginLeft: '68.75rem',
  },
});

const Header = () => (
  <StyledAppBar>
    {/* passHref: href 속성을 Link의 children에게 전달 */}
    <Link href="/main" passHref>
      <Text>Writing Hub</Text>
    </Link>
    <Button outline="black" size="md">
      로그인
    </Button>
  </StyledAppBar>
);

export default Header;
