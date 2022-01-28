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
  const folderList = [
    { value: 0, folder: '내 생각' },
    { value: 1, folder: 'option 1' },
    { value: 2, folder: 'option 2' },
    { value: 3, folder: 'option 3' },
  ];
  const imageList = [0, 1, 2, 3];

  const [data, setData] = useState<WritingContentsType>(initialWriting);

  const mutation = usePostContents(data);

  const onFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, folder: parseInt(value) }));
  };

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
            <tr>
              <Table.TitleTd>{'폴더'}</Table.TitleTd>
              <Table.ContentsTd>
                <select value={data.folder} onChange={onFolderChange}>
                  {folderList.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.folder}
                    </option>
                  ))}
                </select>
              </Table.ContentsTd>
            </tr>
            <tr>
              <Table.TitleTd>{'제목'}</Table.TitleTd>
              <Table.ContentsTd>
                <Input.BasicInput
                  css={{ width: 900 }}
                  onChange={onTitleChange}
                  placeholder={'제목을 입력해주세요.'}
                />
              </Table.ContentsTd>
            </tr>
            <tr>
              <Table.TitleTd css={{ height: '360px' }}>{'내용'}</Table.TitleTd>
              <Table.ContentsTd css={{ height: '360px' }}>
                <TextEditor value={data.contents} onChange={onContentsChange} />
              </Table.ContentsTd>
            </tr>
            <tr>
              <Table.TitleTd>{'글 소개'}</Table.TitleTd>
              <Table.ContentsTd>
                <Input.BasicInput
                  css={{ width: 900 }}
                  onChange={onDescChange}
                />
              </Table.ContentsTd>
            </tr>
            <tr>
              <Table.TitleTd>{'썸네일'}</Table.TitleTd>
              <Table.ContentsTd>
                <Input.BasicInput
                  css={{ width: 900 }}
                  onChange={onThumbnailChange}
                />
              </Table.ContentsTd>
            </tr>
          </tbody>
        </Table.Wrapper>
      </Box>
      <hr />
      <Box css={{ display: 'flex' }}>
        <Button css={{ margin: 'auto', border: '1px solid #C4C7CA' }}>
          {'책으로 쓰기'}
        </Button>
      </Box>
      <Box css={{ display: 'flex' }}>
        <Box css={{ margin: '0 10px 0' }}>
          <label>{'분류'}</label>
          <select>
            <option>{'짧은글'}</option>
          </select>
        </Box>
        <Box css={{ margin: '0 10px 0' }}>
          <label>{'언어'}</label>
          <select>
            <option>{'한국어'}</option>
          </select>
        </Box>
        <Box css={{ margin: '0 10px 0' }}>
          <label>{'연재'}</label>
          <select>
            <option>{'시리즈'}</option>
          </select>
        </Box>
        <Box css={{ margin: '0 10px 0' }}>
          <label>{'시리즈명'}</label>
          <select>
            <option>{'가끔 그 시절의 내가 그립다.'}</option>
          </select>
        </Box>
      </Box>
      <hr />
      <Box css={{ display: 'flex' }}>
        <Box css={{ display: 'flex', margin: 'auto' }}>
          {imageList.map((item) => (
            <Box css={{ margin: '0 10px 0' }} key={`img-${item}`}>
              <img width={'230'} height={'210'} />
            </Box>
          ))}
        </Box>
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
          <Button
            css={{
              color: '$primary',
              border: '1px solid $primary',
              margin: '0 5px 0',
            }}
          >
            {'임시저장'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Writing;
