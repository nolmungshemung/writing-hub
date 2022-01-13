export interface MainContents {
  contentsId: number;
  title: string;
  thumbnail: string;
  introduction: string;
  writer: Writer;
  language: string;
  isTranslate: boolean;
  originalId: number;
}

export interface Writer {
  writerName: string;
  writerId: string;
}
