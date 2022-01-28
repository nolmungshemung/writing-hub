import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { SuccessResponse } from '~/shared/types';
import { Contents, ContentsSearchParams, Writer } from './services.model';
import { getMainContents, getMainWriters } from './services.api';

export function useMainContents(
  { start, count, baseTime, keyword }: ContentsSearchParams,
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
    ['/services/main_contents', { start, count, baseTime, keyword }],
    () => getMainContents({ start, count, baseTime, keyword }),
    {
      retry: 2,
      ...options,
    },
  );
}

export function useMainWriters(
  { start, count, baseTime, keyword }: ContentsSearchParams,
  options:
    | UseQueryOptions<
        SuccessResponse<Writer[]>,
        AxiosError<unknown>,
        SuccessResponse<Writer[]>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<Writer[]>, AxiosError>(
    ['/services/main_writers', { start, count, baseTime, keyword }],
    () => getMainWriters({ start, count, baseTime, keyword }),
    {
      retry: 2,
      ...options,
    },
  );
}
