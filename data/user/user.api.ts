import axios from '~/shared/axios';
import { SuccessResponse } from '~/shared/types';
import { UserData, NameRegistrationRequest } from './user.model';

export async function getUserInfo(userId: string) {
  const { data } = await axios.get<SuccessResponse<UserData>>(
    '/user/user_info',
    {
      params: {
        userId,
      },
    },
  );
  return data;
}

export async function postNameRegistration(
  nameRegistrationRequest: NameRegistrationRequest,
) {
  const { data } = await axios.post<SuccessResponse>(
    '/user/name_registration',
    nameRegistrationRequest,
  );
  return data;
}

export async function postUserLogin(userId: string) {
  const { data } = await axios.post<SuccessResponse>('/user/user_login', {
    userId,
  });
  return data;
}
