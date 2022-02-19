import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { AxiosError } from 'axios';
import { SuccessResponse } from '~/shared/types';
import {
  WritingContentsRequest,
  MainWritersResponse,
  ContentsSearchParams,
  MainContentsResponse,
  TranslatingContentsData,
  ReadingContentsData,
  FeedContentsData,
  FeedParams,
} from './services.model';
import {
  getFeedContents,
  getMainContents,
  getMainWriters,
  getReadingContents,
  getTranslatingContents,
  postWritingContents,
} from './services.api';

export function useInfinityContents(
  contentsSearchParams: ContentsSearchParams,
  /**
   * @see https://github.com/tannerlinsley/react-query/discussions/1195
   * query variables가 필요할 때
   */
  /**
   * @see https://github.com/tannerlinsley/react-query/discussions/1477
   * TQueryFnData : Query 함수의 반환 데이터
   * TError: Query 함수의 에러 반환값
   * TData: Query 함수의 최종 데이터
   */
  options:
    | UseInfiniteQueryOptions<
        SuccessResponse<MainContentsResponse>,
        AxiosError<unknown>,
        SuccessResponse<MainContentsResponse>
      >
    | undefined = {},
) {
  return useInfiniteQuery<SuccessResponse<MainContentsResponse>, AxiosError>(
    ['/services/main_contents', contentsSearchParams],
    getMainContents,
    {
      retry: 2,
      refetchOnWindowFocus: false,
      ...options,
    },
  );
}

export function useInfinityWriters(
  contentsSearchParams: ContentsSearchParams,
  options:
    | UseInfiniteQueryOptions<
        SuccessResponse<MainWritersResponse>,
        AxiosError<unknown>,
        SuccessResponse<MainWritersResponse>
      >
    | undefined = {},
) {
  return useInfiniteQuery<SuccessResponse<MainWritersResponse>, AxiosError>(
    ['/services/main_writers', contentsSearchParams],
    getMainWriters,
    {
      retry: 2,
      refetchOnWindowFocus: false,
      ...options,
    },
  );
}

export function useTranslatingContents(
  contentsId: number,
  options:
    | UseQueryOptions<
        SuccessResponse<TranslatingContentsData>,
        AxiosError<unknown>,
        SuccessResponse<TranslatingContentsData>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<TranslatingContentsData>, AxiosError>(
    ['/services/translating_contents', contentsId],
    () => getTranslatingContents(contentsId),
    {
      retry: 2,
      ...options,
    },
  );
}

export function useReadingContents(
  contentsId: number,
  options:
    | UseQueryOptions<
        SuccessResponse<ReadingContentsData>,
        AxiosError<unknown>,
        SuccessResponse<ReadingContentsData>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<ReadingContentsData>, AxiosError>(
    ['/services/reading_contents', contentsId],
    () => getReadingContents(contentsId),
    {
      retry: 2,
      ...options,
    },
  );
}

export function usePostContents(
  /**
   * TData: 결과값
   * TError
   * TVariables: mutation variables
   */
  options: UseMutationOptions<
    SuccessResponse,
    AxiosError<unknown>,
    WritingContentsRequest
  >,
) {
  return useMutation<SuccessResponse, AxiosError, WritingContentsRequest>(
    '/services/writing_contents',
    postWritingContents,
    {
      retry: false,
      ...options,
    },
  );
}

export function useFeedContents(
  feedParams: FeedParams,
  options:
    | UseQueryOptions<
        SuccessResponse<FeedContentsData>,
        AxiosError<unknown>,
        SuccessResponse<FeedContentsData>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<FeedContentsData>, AxiosError>(
    ['/services/feed_contents', feedParams],
    () => getFeedContents(feedParams),
    {
      retry: 2,
      ...options,
    },
  );
}
