import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { AxiosError } from 'axios';
import { SuccessResponse } from '~/shared/types';
import { Contents, WritingContentsRequest, Writer } from './services.model';
import {
  getMainContents,
  postWritingContents,
  getMainWriters,
} from './services.api';

export function useMainContents(
  start?: number,
  count?: number,
  baseTime?: number,
  keyword?: string,
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
    | UseQueryOptions<
        SuccessResponse<Contents[]>,
        AxiosError<unknown>,
        SuccessResponse<Contents[]>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<Contents[]>, AxiosError>(
    ['/services/main_contents', start, count, baseTime, keyword],
    () => getMainContents(start, count, baseTime, keyword),
    {
      retry: 2,
      ...options,
    },
  );
}

export function useMainWriters(
  start?: number,
  count?: number,
  baseTime?: number,
  keyword?: string,
  options:
    | UseQueryOptions<
        SuccessResponse<Writer[]>,
        AxiosError<unknown>,
        SuccessResponse<Writer[]>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<Writer[]>, AxiosError>(
    ['/services/main_writers', start, count, baseTime, keyword],
    () => getMainWriters(start, count, baseTime, keyword),
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
