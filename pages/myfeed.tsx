import { Box, Button } from '@nolmungshemung/ui-kits';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';
import { Pagination } from '~/components/common';
import Card from '~/components/Main/Card';
import { SkeletonCard } from '~/components/Skeleton';
import { getFeedContents } from '~/data/services/services.api';
import { useFeedContents } from '~/data/services/services.hooks';
import { FeedParams } from '~/data/services/services.model';
import { usePagination } from '~/hooks/usePagination';
import { DEFAULT_START_PAGE } from '~/shared/constants/pagination';

interface MyFeedProps {
  feedParams: FeedParams;
  dehydratedState: any;
}

const DEFAULT_SHOW_FEED_COUNT = 8;
const DEFAULT_SHOW_PAGENATION_COUNT = 10;

const MyFeed = function ({ feedParams }: MyFeedProps) {
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
            justifyContent: 'center',
            width: '100%',
            height: '5.375rem',
            paddingTop: '$sp-50',
          }}
        >
          <span>
            {data?.data.writer.writerName ?? 'XXX'} 작가님의 피드입니다
          </span>
          <Button
            color="primary"
            outline="none"
            css={{
              cursor: 'pointer',
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
            gridTemplateRows: 'repeat(5, 1fr)',
            columnGap: '$sp-24',
            rowGap: '$sp-16',
            marginTop: '$sp-32',
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
          }}
        >
          <Pagination
            totalPages={data?.data.paging.totalPages ?? 1}
            displayAmount={DEFAULT_SHOW_PAGENATION_COUNT}
            currentPage={page.page}
            setPage={handleSetPage}
          />
        </Box>
      </Box>
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
): Promise<
  | {
      props: MyFeedProps;
    }
  | undefined
> {
  try {
    const writerId = context.query.writerId as string;
    const feedParams: FeedParams = {
      writerId: writerId,
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
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default MyFeed;
