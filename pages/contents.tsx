import { Box, Button, styled } from '@nolmungshemung/ui-kits';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { getReadingContents } from '~/data/services/services.api';
import { useReadingContents } from '~/data/services/services.hooks';
import { SkeletonCard } from '~/components/Skeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Card from '~/components/Main/Card';
import { getSession } from 'next-auth/react';
import { WritingHubSession } from '~/data/user/user.model';

const StyledColBorder = styled(Box, {
  borderRight: '1px #999999 solid',
  height: '$space$sp-16',
  margin: '0 $sp-16',
});

interface ReadingProps {
  contentsId: number;
  dehydratedState: DehydratedState;
  session: WritingHubSession | null;
}

function Reading({ contentsId }: ReadingProps) {
  const { data, isLoading } = useReadingContents(contentsId);

  const onCardClick = (translatedContentsId: number) => {
    Router.push({
      pathname: '/contents',
      query: { contentsId: translatedContentsId },
    });
  };

  return (
    <>
      <NextSeo
        title="WritingHub: 글읽기"
        description="라이팅허브 글읽기 화면"
      />
      <Box
        css={{
          display: 'flex',
          flexBasis: '0',
          height: 'calc(100% - $height-appbar + 1rem)',
        }}
      >
        <Box
          css={{
            marginLeft: '18vw',
            padding: '$sp-24 $sp-16 $sp-24 $sp-32',
          }}
        >
          <Box
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '60vw',
              minWidth: '22.5rem',
              height: '100%',
              padding: '$sp-24 $sp-32',
              border: '1px #E0E0E0 solid',
            }}
          >
            <Box
              css={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '7rem',
                borderBottom: '1px #E0E0E0 solid',
              }}
            >
              <Box
                css={{
                  gridArea: 'title',
                  fontSize: '$ft-32',
                  height: '3rem',
                }}
              >
                {isLoading ? (
                  <Skeleton width="10rem" />
                ) : (
                  data?.data.title ?? ''
                )}
              </Box>
              <Box
                css={{
                  gridArea: 'writer',
                  textAlign: 'right',
                  flexGrow: '1',
                  height: '2rem',
                }}
              >
                작가 :{' '}
                {isLoading ? (
                  <Skeleton width="3rem" />
                ) : (
                  data?.data.writer.writerName ?? ''
                )}
              </Box>
              <Box css={{ display: 'flex', paddingBottom: '$sp-16' }}>
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                  }}
                >
                  {isLoading ? (
                    <Skeleton width="3rem" />
                  ) : (
                    data?.data.language ?? ''
                  )}
                </Box>
                <StyledColBorder />
                <Box css={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  {isLoading ? (
                    <Skeleton width="3rem" />
                  ) : (
                    <span>
                      {new Date(
                        data?.data.createdDate ?? 0,
                      ).toLocaleDateString() ?? '2022.02.13'}
                    </span>
                  )}
                </Box>
                <Box
                  css={{
                    flexGrow: '1',
                  }}
                ></Box>
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    textAlign: 'right',
                  }}
                >
                  조회수{' '}
                  {isLoading ? (
                    <Skeleton width="3rem" />
                  ) : (
                    data?.data.views ?? 0
                  )}
                </Box>
                <StyledColBorder />
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    textAlign: 'right',
                  }}
                >
                  번역{' '}
                  {isLoading ? (
                    <Skeleton width="3rem" />
                  ) : (
                    data?.data.transitionNum ?? 0
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              css={{
                width: '100%',
                flexGrow: '1',
                lineHeight: '$base',
                paddingTop: '$sp-16',
                whiteSpace: 'pre-line',
              }}
            >
              {isLoading
                ? [...Array(20)].map(() => (
                    <Skeleton key={Math.random()} width="60rem" />
                  ))
                : data?.data.contents ?? ''}
            </Box>
            <Box
              css={{
                margin: '0',
                width: '100%',
                height: '3rem',
                textAlign: 'center',
              }}
            >
              <Button
                size="lg"
                css={{
                  width: '5rem',
                  border: '1px solid #C4C7CA',
                  margin: '0 $sp-06',
                  cursor: 'pointer',
                }}
              >
                {'번역하기'}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '3rem',
            height: '100%',
            width: 'calc(17.825rem + $space$sp-16 + $space$sp-16)',
          }}
        >
          <Box
            css={{
              fontSize: '$ft-24',
              textAlign: 'center',
            }}
          >
            번역글
          </Box>
          <Box
            css={{
              display: 'grid',
              justifyContent: 'center',
              gridRowGap: '$sp-16',
              padding: '$sp-16',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {isLoading ? (
              <SkeletonCard />
            ) : (
              data?.data?.translatedContentsList.map((contents, index) => (
                <Card
                  {...contents}
                  key={contents.contentsId + index}
                  onCardClick={() => onCardClick(contents.contentsId)}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
  try {
    const contentsId = Number(context.query.contentsId);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      ['/services/reading_contents', contentsId],
      () => getReadingContents(contentsId),
    );

    return {
      props: {
        contentsId: contentsId,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        session: await getSession(context),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

Reading.auth = false;
export default Reading;
