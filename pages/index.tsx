import { styled } from '@nolmungshemung/ui-kits/dist/stitches.config';
import useSearch from '~/hooks/useSearch';
import { useState } from 'react';
import { Contents, ContentsSearchParams } from '~/data/services/services.model';
import { getMainContents } from '~/data/services/services.api';
import { Box, Search } from '@nolmungshemung/ui-kits';
import { NextPage } from 'next';
import { SuccessResponse } from '~/shared/types';
import CardList from '~/components/index/CardList';
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query';

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

const DEFAULT_SEARCH_RANGE = 20;

//  props가 SuccessResponse<Contents[]>로 받으면 data가 비어져있음
const Main: NextPage = function () {
  const [searchResult, setSearchResult] =
    useState<SuccessResponse<Contents[]>>();
  const [searchStartIndex, setSearchStartIndex] = useState(0);
  const [searchBaseTime, setSearchBaseTime] = useState(Date.now());
  const [isInitResult, setIsInitResult] = useState(true);
  const [searchParams, setSearchParams] = useState<ContentsSearchParams>({
    start: searchStartIndex,
    count: DEFAULT_SEARCH_RANGE,
    baseTime: searchBaseTime,
    keyword: '',
  });

  const { data, page } = useInfiniteQuery(
    ['/services/main_contents', searchParams],
    () => getMainContents(searchParams),
  );

  console.log(data);

  const doSearchTitle = async (keyword: string) => {
    try {
      if (searchStartIndex === 0) {
        setSearchBaseTime(Date.now());
        //  TO-DO : searchBaseTime이 반영이 안된채로 API 호출을 함 => 어떻게 해결?
      }

      const res = await getMainContents({ ...searchParams, keyword: keyword });
      if (isInitResult) setIsInitResult(false);
      setSearchResult(res);
      setSearchStartIndex((prev) => prev + DEFAULT_SEARCH_RANGE);
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
      </SytledTopArea>
      {/* {isInitResult ? (
        <CardList resultList={data?.pages.} />
      ) : (
        <CardList resultList={searchResult} />
      )} */}
    </StyledMain>
  );
};

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    const queryParams: ContentsSearchParams = {
      start: 0,
      count: DEFAULT_SEARCH_RANGE,
      baseTime: Date.now(),
      keyword: '',
    };
    await queryClient.prefetchInfiniteQuery(
      ['/services/main_contents', queryParams],
      () => getMainContents(queryParams),
    );
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Main;
