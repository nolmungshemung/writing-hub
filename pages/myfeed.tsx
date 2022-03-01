import { Box, Button } from '@nolmungshemung/ui-kits';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { Pagination } from '~/components/common';
import Card from '~/components/Main/Card';
import { SkeletonCard } from '~/components/Skeleton';
import { getFeedContents } from '~/data/services/services.api';
import { useFeedContents } from '~/data/services/services.hooks';
import { FeedParams } from '~/data/services/services.model';
import { WritingHubSession } from '~/data/user/user.model';
import { usePagination } from '~/hooks/usePagination';
import { DEFAULT_START_PAGE } from '~/shared/constants/pagination';

interface MyFeedProps {
  feedParams: FeedParams;
  dehydratedState: DehydratedState;
  session: WritingHubSession | null;
}

const DEFAULT_SHOW_FEED_COUNT = 8;
const DEFAULT_SHOW_PAGENATION_COUNT = 10;

function MyFeed({ feedParams }: MyFeedProps) {
  const { page, handleSetPage } = usePagination<FeedParams>(feedParams);
  const { data, isLoading } = useFeedContents(feedParams);

  const onCardClick = (contentsId: number) => {
    Router.push({
      pathname: '/contents',
      query: { contentsId },
    });
  };

  const onWritingClick = () => {
    Router.push({
      pathname: '/writing',
    });
  };

  return (
    <>
      <NextSeo
        title="WritingHub: 내 피드"
        description="라이팅허브 내 피드 화면"
      />
      <Box
        css={{
          display: 'grid',
          gridTemplateAreas: `
          "top"
          "contents"
          "pagination"
          `,
          justifyItems: 'center',
        }}
      >
        <Box
          css={{
            gridArea: 'top',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '5.375rem',
            paddingTop: '$sp-50',
            '& .page-title': {
              marginLeft: '45vw',
            },
          }}
        >
          <span className="page-title">
            {data?.data.writer.writerName ?? 'XXX'} 작가님의 피드입니다
          </span>
          <Button
            size="lg"
            color="primary"
            outline="none"
            css={{
              cursor: 'pointer',
              marginLeft: '23vw',
            }}
            onClick={onWritingClick}
          >
            글쓰기
          </Button>
        </Box>
        <Box
          css={{
            gridArea: 'contents',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            columnGap: '$sp-24',
            rowGap: '$sp-16',
            marginTop: '$sp-32',
            height: 'calc(100% - 5.375rem - 4rem)',
          }}
        >
          {isLoading ? (
            <SkeletonCard count={DEFAULT_SHOW_FEED_COUNT} />
          ) : (
            data?.data.feedContentsList.map((contents) => (
              <Card
                key={contents.contentsId}
                {...contents}
                onCardClick={() => onCardClick(contents.contentsId)}
              />
            ))
          )}
        </Box>
        <Box
          css={{
            gridArea: 'pagination',
            width: '100%',
            padding: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data && (
            <Pagination
              totalPages={data?.data.paging.totalPages}
              displayAmount={DEFAULT_SHOW_PAGENATION_COUNT}
              currentPage={page.page}
              setPage={handleSetPage}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
  try {
    const writerId = context.query.writerId;
    const session = await getSession(context);

    // 로그인 정보가 없으면 접근 불가 -> 로그인 페이지로 리다이렉트
    if (!session?.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }

    // 존재하지 않는 컨텐츠에 접근할 때 404 리다이렉트
    if (writerId === undefined) {
      return {
        notFound: true,
      };
    }

    const feedParams: FeedParams = {
      writerId: writerId as string,
      count: DEFAULT_SHOW_FEED_COUNT,
      page: DEFAULT_START_PAGE,
    };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      ['/services/feed_contents', feedParams],
      () => getFeedContents(feedParams),
    );

    return {
      props: {
        feedParams: feedParams,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        session,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

MyFeed.auth = true;
export default MyFeed;
