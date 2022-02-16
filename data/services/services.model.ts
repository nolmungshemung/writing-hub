import { QueryKey } from 'react-query';

export interface Writer {
  writerName: string;
  writerId: string;
}

export interface Contents {
  contentsId: number;
  title: string;
  thumbnail: string;
  introduction: string;
  writer: Writer;
  language: string;
  isTranslate: boolean;
  originalId: number;
  views: number;
  transitionNum: number;
}

export interface MainPagingInfo {
  isLast: boolean;
  start: number;
}

export interface MainContentsResponse {
  mainContentsList: Contents[];
  paging: MainPagingInfo;
}

export interface MainWritersResponse {
  mainWriterList: Writer[];
  paging: MainPagingInfo;
}

export interface ContentsSearchParams {
  start: number;
  count: number;
  baseTime: number;
  keyword: string;
}

export interface ReadingContentsData extends Contents {
  contents: string;
  createdDate: number;
  translatedContentsList: Contents[];
}

export interface TranslatingContentsData extends Contents {
  contents: string;
}

export interface FeedParams {
  writerId: string;
  count: number;
  page: number;
}

export interface FeedPagingInfo extends MainPagingInfo {
  totalPages: number;
}

export interface FeedContentsData {
  writer: Writer;
  feedContentsList: Contents[];
  paging: FeedPagingInfo;
}

export interface WritingContentsRequest {
  title: string;
  thumbnail: string;
  introduction: string;
  contents: string;
  writerId: string;
  language: string;
  isTranslate: boolean;
  originalId: number;
}

export interface InfiniteQueryParam {
  pageParam?: number;
  queryKey: QueryKey;
}
