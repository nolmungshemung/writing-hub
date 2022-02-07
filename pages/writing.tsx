import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Button } from '@nolmungshemung/ui-kits';
import { BasicInput } from '~/components/Input';
import * as Table from '~/components/Table';
import { NextPage } from 'next';
import { WritingContentsRequest } from '~/data/services/services.model';
import TextEditor from '~/components/TextEditor/TextEditor';
import { usePostContents } from '~/data/services/services.hooks';

const initialWriting: WritingContentsRequest = {
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
  const [data, setData] = useState<WritingContentsRequest>(initialWriting);

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
    <>
      <NextSeo
        title="WritingHub: 글쓰기"
        description="라이팅허브 글쓰기 화면"
      />
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Table.Wrapper css={{ width: '1200px', height: '750px' }}>
          <tbody>
            <Table.TableRow>
              <Table.TitleTd>{'제목'}</Table.TitleTd>
              <Table.ContentsTd>
                <BasicInput
                  onChange={onTitleChange}
                  placeholder={'제목을 입력해주세요.'}
                />
              </Table.ContentsTd>
            </Table.TableRow>
            <Table.TableRow>
              <Table.TitleTd>{'글 소개'}</Table.TitleTd>
              <Table.ContentsTd>
                <BasicInput
                  onChange={onDescChange}
                  placeholder={'"이 글은 어떤 글인가요?" 최대 30자'}
                  maxLength={30}
                />
              </Table.ContentsTd>
            </Table.TableRow>
            <Table.TableRow>
              <Table.TitleTd>{'썸네일'}</Table.TitleTd>
              <Table.ContentsTd>
                <BasicInput onChange={onThumbnailChange} />
              </Table.ContentsTd>
            </Table.TableRow>
            <Table.TableRow css={{ height: '600px' }}>
              <Table.TitleTd>{'내용'}</Table.TitleTd>
              <Table.ContentsTd>
                <TextEditor value={data.contents} onChange={onContentsChange} />
              </Table.ContentsTd>
            </Table.TableRow>
          </tbody>
        </Table.Wrapper>
        <Box css={{ marginTop: '$sp-30' }}>
          <Button
            size="lg"
            css={{
              width: '5rem',
              border: '1px solid #C4C7CA',
              margin: '0 $sp-06',
              cursor: 'pointer',
            }}
          >
            {'취소'}
          </Button>
          <Button
            size="lg"
            color="primary"
            css={{
              width: '5rem',
              cursor: 'pointer',
            }}
            onClick={onSubmit}
          >
            {'등록완료'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Writing;
