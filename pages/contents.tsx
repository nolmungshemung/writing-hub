import { GetServerSidePropsContext, NextPage, PreviewData } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';
import { getReadingContents } from '~/data/services/services.api';
import { useReadingContents } from '~/data/services/services.hooks';

const Reading: NextPage = function () {
  const router = useRouter();
  const contentsId = Number(router.query.contentsId);
  const { data, isLoading } = useReadingContents(contentsId);

  return <></>;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
  try {
    const queryClient = new QueryClient();
    const contentsId = Number(context.query.contentsId);
    await queryClient.prefetchQuery(
      ['/services/reading_contents', contentsId],
      () => getReadingContents(contentsId),
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

export default Reading;
