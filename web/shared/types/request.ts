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
