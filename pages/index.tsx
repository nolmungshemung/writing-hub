import { styled } from '@nolmungshemung/ui-kits/dist/stitches.config';
import useSearch from '~/hooks/useSearch';
import { useState } from 'react';
import { Contents, Writer } from '~/data/services/services.model';
import { getMainContents, getMainWriters } from '~/data/services/services.api';
import { Box, Button, Search } from '@nolmungshemung/ui-kits';
import { NextPage } from 'next';
import { SuccessResponse } from '~/shared/types';
import CardList from '~/components/index/CardList';

const StyledMain = styled('div', {
  gridArea: 'main',
  display: 'grid',
  gridTemplateAreas: `
  "top"
  "result"
  `,
  justifyItems: 'center',
});

const SytledTopArea = styled(Box, {
  gridArea: 'top',
});

const StyledSearch = styled(Search, {
  width: '33.125rem',
});

const StyledToggleButton = styled(Button, {});

const DEFAULT_SEARCH_RANGE = 20;

//  props가 SuccessResponse<Contents[]>로 받으면 data가 비어져있음
const Main: NextPage = function ({ data }: SuccessResponse<Contents[]>) {
  const [searchResult, setSearchResult] =
    useState<SuccessResponse<Contents[]>>();
  const [searchStartIndex, setSearchStartIndex] = useState<number>(0);
  const [searchBaseTime, setSearchBaseTime] = useState<number>(Date.now());
  const [isInitResult, setIsInitResult] = useState<boolean>(true);
  const [isTargetContents, setIsTargetContents] = useState<boolean>(true);

  const doSearchTitle = async (keyword: string) => {
    try {
      if (searchStartIndex === 0) {
        setSearchBaseTime(Date.now());
        //  TO-DO : searchBaseTime이 반영이 안된채로 API 호출을 함 => 어떻게 해결?
      }

      if (isTargetContents) {
        const res = await getMainContents(
          searchStartIndex,
          DEFAULT_SEARCH_RANGE,
          searchBaseTime,
          keyword,
        );
        if (isInitResult) setIsInitResult(false);
        setSearchResult(res);
        setSearchStartIndex((prev) => prev + DEFAULT_SEARCH_RANGE);
        console.log(res);
      }
      // } else {
      //   const res = await getMainWriters(
      //     searchStartIndex,
      //     DEFAULT_SEARCH_RANGE,
      //     searchBaseTime,
      //     keyword,
      //   );
      //   if (isInitResult) setIsInitResult(false);
      //   setSearchResult(res);
      //   setSearchStartIndex((prev) => prev + DEFAULT_SEARCH_RANGE);
      // }
    } catch (e) {
      console.error(e);
    }
  };
  const { onChange, onEnter, onSearch } = useSearch(doSearchTitle);
  return (
    <StyledMain>
      <SytledTopArea>
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
      </SytledTopArea>
      {isInitResult ? (
        <CardList resultList={data} />
      ) : (
        <CardList resultList={searchResult} />
      )}
    </StyledMain>
  );
};

export async function getServerSideProps() {
  try {
    //  getServerSideProps 에서 hooks 사용불가
    const res = await getMainContents(0, DEFAULT_SEARCH_RANGE, Date.now());
    return {
      props: {
        data: res,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Main;
