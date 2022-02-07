import useSearch from '~/hooks/useSearch';
import { useState } from 'react';
import { Contents, ContentsSearchParams } from '~/data/services/services.model';
import { getMainContents } from '~/data/services/services.api';
import { Box, Search, styled } from '@nolmungshemung/ui-kits';
import { NextPage } from 'next';
import CardList from '~/components/index/CardList';
import { dehydrate, QueryClient } from 'react-query';
import { useInfinityContents } from '~/data/services/services.hooks';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';

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
  marginTop: '5rem',
});

export const DEFAULT_SEARCH_RANGE = 20;

const Main: NextPage = function () {
  const [searchParams, setSearchParams] = useState<ContentsSearchParams>({
    start: 0,
    count: DEFAULT_SEARCH_RANGE,
    baseTime: Date.now(),
    keyword: '',
  });

  const { data } = useInfinityContents(searchParams);
  const [pages] = (data?.pages ?? []) as unknown as [Contents[]];
  // const results = (data?.pages[0] ?? undefined) as unknown as SuccessResponse<
  //   Contents[]
  // >;

  const doSearchTitle = (keyword: string) => {
    try {
      setSearchParams((prev) => ({
        ...prev,
        baseTime: Date.now(),
        keyword,
      }));
    } catch (e) {
      console.error(e);
    }
  };
  const { onChange, onEnter, onSearch } = useSearch(doSearchTitle);

  function fetchNextPage() {
    setSearchParams((prev) => ({
      ...prev,
      start: prev.start + prev.count,
    }));
  }
  const createObserver = useIntersectionObserver(fetchNextPage);

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
      <CardList createObserver={createObserver} resultList={pages} />
      {/* <CardList createObserver={createObserver} resultList={results?.data} /> */}
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
