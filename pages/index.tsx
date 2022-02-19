import { useState, useRef } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Router from 'next/router';
import { useSearch, useIntersectionObserver } from '~/hooks';
import {
  ContentsSearchParams,
  MainContentsResponse,
} from '~/data/services/services.model';
import { getMainContents } from '~/data/services/services.api';
import { Box, Search, styled, Button } from '@nolmungshemung/ui-kits';
import { useInfinityContents } from '~/data/services/services.hooks';
import { SuccessResponse } from '~/shared/types';
import Card from '~/components/Main/Card';
import { SkeletonCard } from '~/components/Skeleton';
import { DEFAULT_SEARCH_RANGE } from '~/shared/constants/pagination';
import { NextSeo } from 'next-seo';
import { MILLISEC_TO_SECOND } from '~/shared/constants/unit';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next/types';

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
  baseTime: Math.floor(Date.now() / MILLISEC_TO_SECOND),
  keyword: '',
};

function Main() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] =
    useState<ContentsSearchParams>(initialState);

  const { onChange, onEnter, onSearch } = useSearch((keyword: string) => {
    setSearchParams((prev) => ({
      ...prev,
      baseTime: Math.floor(Date.now() / MILLISEC_TO_SECOND),
      keyword,
    }));
  });

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinityContents(searchParams, {
      getNextPageParam: (lastPage) => {
        const {
          data: {
            paging: { isLast, start },
          },
        } = lastPage;

        return !isLast ? start + DEFAULT_SEARCH_RANGE : false;
      },
    });

  const pages = (data?.pages ?? []) as SuccessResponse<MainContentsResponse>[];
  const flatMainContents = pages
    .map((page) => page.data.mainContentsList.map((contents) => contents))
    .flat();

  useIntersectionObserver({
    target: loadMoreRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  const onWriterSearchButtonClick = () => {
    Router.push('/writers');
  };

  const onCardClick = (contentsId: number) => {
    Router.push({
      pathname: '/contents',
      query: { contentsId },
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
          {flatMainContents.map((contents) => (
            <Card
              key={contents.contentsId}
              {...contents}
              onCardClick={() => onCardClick(contents.contentsId)}
            />
          ))}
          {isFetchingNextPage && <SkeletonCard />}
        </>
      );
    }

    return undefined;
  };

  return (
    <>
      <NextSeo
        title="WritingHub: 작품 검색"
        description="라이팅허브 작품 검색 화면"
      />
      <StyledMain>
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
              onClick={onWriterSearchButtonClick}
            >
              작가검색
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
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery(
      ['/services/main_contents', initialState],
      getMainContents,
    );
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        session: await getSession(context),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

Main.auth = false;
export default Main;
