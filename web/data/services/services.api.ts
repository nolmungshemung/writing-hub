import axios from '~/shared/axios';
import { Response } from '~/shared/types';
import { MainContents } from './services.model';

export async function getMainContents(params: { keyword: string }) {
  const { data } = await axios.get<Response<MainContents[]>>(
    '/services/main_contents',
    {
      params,
    },
  );
  return data;
}
