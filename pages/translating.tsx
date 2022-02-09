import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Button, Input } from '@nolmungshemung/ui-kits';
import { BasicInput } from '~/components/Input';
import * as Table from '~/components/Table';
import { NextPage } from 'next';
import { WritingContentsRequest } from '~/data/services/services.model';
import TextEditor from '~/components/TextEditor/TextEditor';
import { usePostContents } from '~/data/services/services.hooks';
import { RiRefreshLine } from 'react-icons/ri';

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

const Translating: NextPage = function () {
  const [writingContents, setWritingContents] =
    useState<WritingContentsRequest>(initialWriting);

  const {
    data: response,
    isLoading,
    mutate,
  } = usePostContents({
    onSuccess() {
      window.alert(response?.msg ?? '저장되었습니다!');
    },
    onError(error) {
      console.error(error);
    },
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWritingContents({ ...writingContents, title: value });
  };

  const onContentsChange = (value: string) => {
    setWritingContents({ ...writingContents, contents: value });
  };

  const onDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWritingContents({ ...writingContents, introduction: value });
  };

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWritingContents({ ...writingContents, thumbnail: value });
  };

  const onSubmit = () => {
    mutate(writingContents);
  };

  return (
    <>
      <NextSeo
        title="WritingHub: 번역하기"
        description="라이팅허브 번역하기 화면"
      />
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '$sp-32',
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
          }}
        >
          <Table.Wrapper css={{ width: '45%', height: '700px', margin: '0' }}>
            <tbody>
              <Table.TableRow>
                <Table.TitleTd colspan="2">원문</Table.TitleTd>
              </Table.TableRow>
              <Table.TableRow>
                <Table.TitleTd>{'제목'}</Table.TitleTd>
                <Table.ContentsTd>
                  <BasicInput readOnly />
                </Table.ContentsTd>
              </Table.TableRow>
              <Table.TableRow>
                <Table.TitleTd>{'글 소개'}</Table.TitleTd>
                <Table.ContentsTd>
                  <BasicInput readOnly />
                </Table.ContentsTd>
              </Table.TableRow>
              <Table.TableRow>
                <Table.TitleTd>{'썸네일'}</Table.TitleTd>
                <Table.ContentsTd>
                  <BasicInput readOnly />
                </Table.ContentsTd>
              </Table.TableRow>
              <Table.TableRow css={{ height: '600px' }}>
                <Table.TitleTd>{'내용'}</Table.TitleTd>
                <Table.ContentsTd>
                  <Input.Text
                    css={{
                      width: '95%',
                      height: '99%',
                      border: 'none',
                      '&:focus': {
                        outline: 'none',
                      },
                      backgroundColor: '$gray',
                    }}
                    readOnly
                  />
                </Table.ContentsTd>
              </Table.TableRow>
            </tbody>
          </Table.Wrapper>
          <Box
            css={{
              textAlign: 'center',
              width: '10%',
            }}
          >
            <Box>
              <RiRefreshLine />
            </Box>
            <Box>번역</Box>
          </Box>
          <Table.Wrapper css={{ width: '45%', height: '700px', margin: '0' }}>
            <tbody>
              <Table.TableRow>
                <Table.TitleTd colspan="2">번역</Table.TitleTd>
              </Table.TableRow>
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
                  <TextEditor
                    value={writingContents.contents}
                    onChange={onContentsChange}
                  />
                </Table.ContentsTd>
              </Table.TableRow>
            </tbody>
          </Table.Wrapper>
          {isLoading && <div>Loading...</div>}
        </Box>
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

export default Translating;
