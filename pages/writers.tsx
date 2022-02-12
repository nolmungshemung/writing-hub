import { useState, useRef } from 'react';
import { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import Router from 'next/router';
import { useIntersectionObserver, useSearch } from '~/hooks';
import {
  ContentsSearchParams,
  MainWritersResponse,
  Writer,
} from '~/data/services/services.model';
import { getMainWriters } from '~/data/services/services.api';
import { Box, Search, styled, Button } from '@nolmungshemung/ui-kits';
import { useInfinityWriters } from '~/data/services/services.hooks';
import { SuccessResponse } from '~/shared/types';
import { StyledCard } from '~/components/Main/Card';
import { SkeletonCard } from '~/components/Skeleton';
import { DEFAULT_SEARCH_RANGE } from '~/shared/constants/pagination';
import { NextSeo } from 'next-seo';

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

const StyledCardList = styled(Box, {
  gridArea: 'result',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  columnGap: '$sp-24',
  rowGap: '$sp-16',
  marginTop: '$sp-32',
});

const initialState: ContentsSearchParams = {
  start: 0,
  count: DEFAULT_SEARCH_RANGE,
  baseTime: Date.now(),
  keyword: '',
};

const Main: NextPage = function () {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] =
    useState<ContentsSearchParams>(initialState);

  const { onChange, onEnter, onSearch } = useSearch((keyword: string) => {
    setSearchParams((prev) => ({
      ...prev,
      baseTime: Date.now(),
      keyword,
    }));
  });

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinityWriters(searchParams, {
      getNextPageParam: (lastPage) => {
        const {
          data: { isLast, start },
        } = lastPage;

        return !isLast ? start + DEFAULT_SEARCH_RANGE : false;
      },
    });

  const pages = (data?.pages ?? []) as SuccessResponse<MainWritersResponse>[];
  const flatMainWriters = pages
    .map((page) => page.data.mainWriterList.map((writer: Writer) => writer))
    .flat();

  useIntersectionObserver({
    target: loadMoreRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  const onContentsSearchButtonClick = () => {
    Router.push('/');
  };

  const onCardClick = (writerId: string) => {
    Router.push({
      pathname: '/feeds',
      query: { writerId },
    });
  };

  const renderCardList = () => {
    // 데이터 최초 로딩 시 보여주는 스켈레톤 UI
    if (isLoading) {
      return <SkeletonCard count={20} />;
    }

    if (pages.length > 0) {
      return (
        <>
          {flatMainWriters.map((writer: Writer, index: number) => (
            <StyledCard
              key={index}
              onClick={() => onCardClick(writer.writerId)}
              css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>{writer.writerName}</Box>
            </StyledCard>
          ))}
          {isFetchingNextPage && <SkeletonCard />}
        </>
      );
    }

    return undefined;
  };

  return (
    <StyledMain>
      <NextSeo
        title="WritingHub: 작가 검색"
        description="라이팅허브 작가 검색 화면"
      />
      <SytledTopArea>
        <Box
          css={{
            position: 'relative',
            display: 'flex',
            marginTop: '$sp-50',
            justifyContent: 'center',
            width: '1216px',
          }}
        >
          <Search
            placeholder="검색어를 입력해주세요."
            onChange={onChange}
            onEnter={onEnter}
            onSearch={onSearch}
          />
          <Button
            color="white"
            outline="black"
            css={{
              position: 'absolute',
              right: '0',
              cursor: 'pointer',
            }}
            onClick={onContentsSearchButtonClick}
          >
            작품검색
          </Button>
        </Box>
      </SytledTopArea>
      <StyledCardList>
        {renderCardList()}
        <Box
          ref={loadMoreRef}
          css={{
            height: '$height-md',
          }}
        />
      </StyledCardList>
    </StyledMain>
  );
};

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery(
      ['/services/main_writers', initialState],
      getMainWriters,
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
