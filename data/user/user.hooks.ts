import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { SuccessResponse } from '~/shared/types';
import { UserData } from './user.model';
import { getUserInfo } from './user.api';

export function useUserInfo(
  userId: string,
  options:
    | UseQueryOptions<
        SuccessResponse<UserData>,
        AxiosError<unknown>,
        SuccessResponse<UserData>
      >
    | undefined = {},
) {
  return useQuery<SuccessResponse<UserData>, AxiosError>(
    ['/user/user_info', userId],
    () => getUserInfo(userId),
    {
      retry: 2,
      ...options,
    },
  );
}
