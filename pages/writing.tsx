import React, { useState } from 'react';

import { Box, Button } from '@nolmungshemung/ui-kits';
import * as Input from '~/components/Input';
import * as Table from '~/components/Table';
import { NextPage } from 'next';
import { WritingContentsRequest } from '~/data/services/services.model';
import TextEditor from '~/components/TextEditor/TextEditor';
import { usePostContents } from '~/data/services/services.hooks';

interface WritingContentsType extends WritingContentsRequest {
  folder: number;
}
const initialWriting: WritingContentsType = {
  folder: 0,
  title: '',
  thumbnail: '',
  introduction: '',
  contents: '',
  writerId: '',
  language: '',
  isTranslate: false,
  originalId: 0,
};

const Writing: NextPage = function () {
  const [data, setData] = useState<WritingContentsType>(initialWriting);

  const mutation = usePostContents(data);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData({ ...data, title: value });
  };

  const onContentsChange = (value: string) => {
    setData({ ...data, contents: value });
  };

  const onDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData({ ...data, introduction: value });
  };

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData({ ...data, thumbnail: value });
  };

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <Box css={{ margin: '0 200px 0' }}>
      <Box>
        <Table.Wrapper>
          <tbody>
            <Table.TableRow>
              <Table.TitleTd>{'제목'}</Table.TitleTd>
              <Table.ContentsTd>
                <Input.BasicInput
                  css={{ width: 900 }}
                  onChange={onTitleChange}
                  placeholder={'제목을 입력해주세요.'}
                />
              </Table.ContentsTd>
            </Table.TableRow>
            <Table.TableRow>
              <Table.TitleTd>{'글 소개'}</Table.TitleTd>
              <Table.ContentsTd>
                <Input.BasicInput
                  css={{ width: 900 }}
                  onChange={onDescChange}
                />
              </Table.ContentsTd>
            </Table.TableRow>
            <Table.TableRow>
              <Table.TitleTd>{'썸네일'}</Table.TitleTd>
              <Table.ContentsTd>
                <Input.BasicInput
                  css={{ width: 900 }}
                  onChange={onThumbnailChange}
                />
              </Table.ContentsTd>
            </Table.TableRow>
            <Table.TableRow>
              <Table.TitleTd css={{ height: '360px' }}>{'내용'}</Table.TitleTd>
              <Table.ContentsTd css={{ height: '360px' }}>
                <TextEditor value={data.contents} onChange={onContentsChange} />
              </Table.ContentsTd>
            </Table.TableRow>
          </tbody>
        </Table.Wrapper>
      </Box>
      <Box css={{ display: 'flex' }}>
        <Box css={{ margin: 'auto' }}>
          <Button css={{ border: '1px solid #C4C7CA', margin: '0 5px 0' }}>
            {'취소'}
          </Button>
          <Button
            css={{
              color: '#ffffff',
              background: '$primary',
              margin: '0 5px 0',
            }}
            onClick={onSubmit}
          >
            {'등록완료'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Writing;
