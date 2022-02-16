import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getFeedContents } from '~/data/services/services.api';
import { useFeedContents } from '~/data/services/services.hooks';
import { FeedParams } from '~/data/services/services.model';
import {
  DEFAULT_FEED_COUNT,
  DEFAULT_START_PAGE,
} from '~/shared/constants/pagination';

interface MyFeedProps {
  feedParams: FeedParams;
  dehydratedState: any;
}

const MyFeed = function ({ feedParams: initFeedParams }: MyFeedProps) {
  const [feedParams, setFeedParams] = useState(initFeedParams);
  const { data, isLoading } = useFeedContents(feedParams);

  return (
    <>
      <NextSeo
        title="WritingHub: 내 피드"
        description="라이팅허브 내 피드 화면"
      />
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
      count: DEFAULT_FEED_COUNT,
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
