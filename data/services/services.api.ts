import axios from '~/shared/axios';
import { SuccessResponse } from '~/shared/types';
import {
  MainContentsResponse,
  Writer,
  ReadingContentsData,
  TranslatingContentsData,
  FeedContentsData,
  WritingContentsRequest,
  ContentsSearchParams,
  InfiniteQueryParam,
} from './services.model';

export async function getMainContents({
  pageParam = 0,
  queryKey,
}: InfiniteQueryParam) {
  const [url, params] = queryKey as [string, ContentsSearchParams];
  const { data } = await axios.get<SuccessResponse<MainContentsResponse>>(url, {
    params: {
      ...params,
      start: pageParam,
    },
  });
  return data;
}

export async function getMainWriters({
  pageParam = 0,
  queryKey,
}: InfiniteQueryParam) {
  const [url, params] = queryKey as [string, ContentsSearchParams];
  const { data } = await axios.get<SuccessResponse<Writer[]>>(url, {
    params: {
      ...params,
      start: pageParam,
    },
  });
  return data;
}

export async function getReadingContents(contentsId: number) {
  const { data } = await axios.get<SuccessResponse<ReadingContentsData>>(
    '/services/reading_contents',
    {
      params: {
        contentsId,
      },
    },
  );
  return data;
}

export async function getTranslatingContents(contentsId: number) {
  const { data } = await axios.get<SuccessResponse<TranslatingContentsData>>(
    '/services/translating_contents',
    {
      params: {
        contentsId,
      },
    },
  );
  return data;
}

export async function getFeedContents(writerId?: string) {
  const { data } = await axios.get<SuccessResponse<FeedContentsData>>(
    '/services/feed_contents',
    {
      params: {
        writerId,
      },
    },
  );
  return data;
}

export async function postWritingContents(
  writingContents: WritingContentsRequest,
) {
  const { data } = await axios.post<SuccessResponse>(
    '/services/writing_contents',
    writingContents,
  );
  return data;
}

export async function postIncreaseViews(contentsId: number) {
  const { data } = await axios.post<SuccessResponse>(
    '/services/increase_views',
    { contentsId },
  );
  return data;
}
