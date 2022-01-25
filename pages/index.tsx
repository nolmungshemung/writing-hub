import { styled } from '@nolmungshemung/ui-kits/dist/stitches.config';
import useSearch from '~/hooks/useSearch';
import { useState } from 'react';
import { Contents, Writer } from '~/data/services/services.model';
import { getMainContents, getMainWriters } from '~/data/services/services.api';
import { Button, Search } from '@nolmungshemung/ui-kits';
import { SuccessResponse } from '~/shared/types';
import Card from '~/components/index/Card';
import { NextPage } from 'next';

const StyledMain = styled('div', {
  gridArea: 'main',
});

const StyledSearch = styled(Search, {
  width: '33.125rem',
});

const StyledToggleButton = styled(Button, {});

const DEFAULT_SEARCH_RANGE = 20;

//  props type 명시화
const Main: NextPage = function ({ initSearchResult }: any) {
  const [searchContents, setSearchContents] = useState<Contents[]>();
  const [searchWriters, setSearchWriters] = useState<Writer[]>();
  const [searchStartIndex, setSearchStartIndex] = useState<number>(0);
  const [searchBaseTime, setSearchBaseTime] = useState<number>(Date.now());
  const [isTargetContents, setIsTargetContents] = useState<boolean>(true);

  const doSearchTitle = async (keyword: string) => {
    try {
      if (searchStartIndex === 0) {
        setSearchBaseTime(Date.now());
        //  TO-DO : searchBaseTime이 반영이 안된채로 API 호출을 함 => 어떻게 해결?
      }

      if (isTargetContents) {
        const { data } = await getMainContents(
          searchStartIndex,
          DEFAULT_SEARCH_RANGE,
          searchBaseTime,
          keyword,
        );
        setSearchContents(data);
        setSearchStartIndex((prev) => prev + DEFAULT_SEARCH_RANGE);
      } else {
        const { data } = await getMainWriters(
          searchStartIndex,
          DEFAULT_SEARCH_RANGE,
          searchBaseTime,
          keyword,
        );
        setSearchWriters(data);
        setSearchStartIndex((prev) => prev + DEFAULT_SEARCH_RANGE);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const { onChange, onEnter, onSearch } = useSearch(doSearchTitle);

  return (
    <StyledMain>
      <StyledSearch
        placeholder="검색어를 입력해주세요."
        onChange={onChange}
        onEnter={onEnter}
        onSearch={onSearch}
      />
      {isTargetContents ? (
        <StyledToggleButton
          outline="black"
          size="lg"
          onClick={() => setIsTargetContents(false)}
        >
          작가 검색
        </StyledToggleButton>
      ) : (
        <StyledToggleButton
          outline="black"
          size="lg"
          onClick={() => setIsTargetContents(true)}
        >
          작품 검색
        </StyledToggleButton>
      )}
      {searchContents === undefined && searchWriters === undefined ? (
        initSearchResult.map((search: Contents) => (
          <Card
            key={search.contentsId}
            contentsId={search.contentsId}
            title={search.title}
            thumbnail={search.thumbnail}
            introduction={search.introduction}
            isTranslate={search.isTranslate}
            language={search.language}
            writer={search.writer}
          />
        ))
      ) : (
        // TO-DO
        <div></div>
      )}
    </StyledMain>
  );
};

export async function getServerSideProps() {
  try {
    //  getServerSideProps 에서 hooks 사용불가
    const result = await getMainContents(0, DEFAULT_SEARCH_RANGE, Date.now());
    return {
      props: {
        initSearchResult: result,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Main;
