export interface MainContents {
  contents_id: number;
  title: string;
  thumbnail: string;
  introduction: string;
  writer: Writer;
  language: string;
  is_translate: boolean;
  original_id: number;
}

export interface Writer {
  writer_name: string;
  writer_id: string;
}
