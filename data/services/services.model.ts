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

export interface ReadingContentsData extends Contents {
  contents: string;
  createdDate: number;
  translatedContentsList: Contents[];
}

export interface TranslatingContentsData extends Contents {
  contents: string;
}

export interface FeedContentsData {
  writer: Writer;
  feedContentsList: Contents[];
}

export interface WritingContentsRequest {
  title: string;
  thumbnail: string;
  introduction: string;
  contents: string;
  writer_id: string;
  language: string;
  is_translate: boolean;
  original_id: number;
}