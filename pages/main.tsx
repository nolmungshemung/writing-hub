import type { NextPage } from 'next';
import { styled } from '@nolmungshemung/ui-kits/dist/stitches.config';
import SearchBar from '../components/ui/SearchBar';
import useSearch from '~/hooks/useSearch';
import { useState } from 'react';
import { MainContents } from '~/data/services/services.model';
import { getMainContents } from '~/data/services/services.api';

const StyledMain = styled('div', {
  gridArea: 'main',
});

// skeleton ui + 작가이름 hover 효과
const Main: NextPage = function () {
  const [searchResult, setSearchResult] = useState<MainContents[]>();
  const doSearchTitle = async (keyword: string) => {
    try {
      const { data } = await getMainContents({ keyword: keyword });
      setSearchResult(data);
    } catch (e) {
      console.error(e);
    }
  };
  const { onChange, onKeyPress, onClick } = useSearch(doSearchTitle);
  console.log(searchResult);
  return (
    <StyledMain>
      <SearchBar
        onChange={onChange}
        onKeyPress={onKeyPress}
        onClick={onClick}
      />
    </StyledMain>
  );
};

export default Main;
