import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { SuccessResponse } from '~/shared/types';
import { Contents, WritingContentsRequest } from './services.model';
import { getMainContents, postWritingContents } from './services.api';

export function useMainContents(
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
    ['/services/main_contents', keyword],
    () => getMainContents(keyword),
    {
      retry: 2,
      ...options,
    },
  );
}

export function usePostContents(contents: WritingContentsRequest) {
  return useMutation<SuccessResponse, AxiosError>(
    '/services/writing_contents',
    () => postWritingContents(contents),
  );
}
