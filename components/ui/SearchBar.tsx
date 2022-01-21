import { Box, Button, Input } from '@nolmungshemung/ui-kits';
import { styled } from '@nolmungshemung/ui-kits/dist/stitches.config';
import { HTMLAttributes } from 'react';

const StyledSearchBar = styled(Box, {
  position: 'relative',
});

const StyledInput = styled(Input.Text, {
  width: '33.125rem',
  border: 'none',
  borderBottom: '1px solid $gray',
  // input 클릭 시 추가 테두리 없애기
  '&:focus': { outline: 'none' },
});

const SearchBar = ({
  onChange,
  onKeyPress,
  onClick,
}: HTMLAttributes<HTMLElement>) => {
  return (
    <StyledSearchBar>
      <StyledInput
        placeholder="검색어를 입력해주세요."
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Button onClick={onClick} />
    </StyledSearchBar>
  );
};

export default SearchBar;
