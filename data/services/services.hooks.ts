import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { Response } from '~/shared/types';
import { MainContents } from './services.model';
import { getMainContents } from './services.api';

export function useMainContents(
  params: {
    keyword: string;
  },
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
        Response<MainContents[]>,
        AxiosError<unknown>,
        Response<MainContents[]>
      >
    | undefined = {},
) {
  return useQuery<Response<MainContents[]>, AxiosError>(
    ['/services/main_contents', params],
    () => getMainContents(params),
    {
      retry: 2,
      ...options,
    },
  );
}
