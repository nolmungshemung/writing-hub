import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
} from 'react-query';
import { AxiosError } from 'axios';
import { SuccessResponse } from '~/shared/types';
import {
  WritingContentsRequest,
  Writer,
  ContentsSearchParams,
  MainContentsResponse,
} from './services.model';
import {
  getMainContents,
  getMainWriters,
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
      ...options,
    },
  );
}

export function useInfinityWriters(
  contentsSearchParams: ContentsSearchParams,
  options:
    | UseInfiniteQueryOptions<
        SuccessResponse<Writer[]>,
        AxiosError<unknown>,
        SuccessResponse<Writer[]>
      >
    | undefined = {},
) {
  return useInfiniteQuery<SuccessResponse<Writer[]>, AxiosError>(
    ['/services/main_writers', contentsSearchParams],
    getMainWriters,
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
