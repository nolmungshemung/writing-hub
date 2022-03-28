import { useState, ChangeEvent } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Text, Button } from '@nolmungshemung/ui-kits';
import { BasicInput } from '~/components/Input';
import { useNameRegistration } from '~/data/user/user.hooks';

const PenName = function () {
  const [userName, setUserName] = useState('');
  const [showError, setShowError] = useState(false);

  const { mutate } = useNameRegistration({
    onSuccess() {
      setShowError(false);
      window.alert('필명이 등록(수정) 되었습니다!');
    },
    onError(error) {
      const errorCode = error.response?.status;
      if (errorCode === 404) {
        setShowError(true);
      } else if (errorCode === 422) {
        setShowError(false);
        window.alert('필명 등록(수정)에 실패했습니다. 관리자에게 문의하세요');
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onPenNameRegist = () => {
    mutate({
      userId: '',
      userName,
    });
  };

  return (
    <>
      <NextSeo
        title="WritingHub: 필명등록"
        description="라이팅허브 필명등록(수정) 화면"
      />
      <Box
        css={{
          height: 'calc(100% - 4rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          css={{
            marginBottom: 'calc($sizes$height-appbar * 2)',
          }}
        >
          <Text css={{ fontSize: '5rem' }}>WritingHub</Text>
          <Box
            css={{
              margin: '$sp-08 0 $sp-24',
            }}
          >
            <Text size="xl" css={{ marginRight: '$sp-12' }}>
              필명 수정
            </Text>
            <Text size="xl" color="gray">
              작품에 등록될 필명을 등록해주세요
            </Text>
          </Box>
          <Box
            css={{
              width: '90%',
              margin: '0 auto $sp-20',
            }}
          >
            <BasicInput
              type="text"
              value={userName}
              onChange={handleChange}
              placeholder="필명"
              css={{
                backgroundColor: '#EEE',
                border: '1px solid #E0E0E0',
                borderRadius: '5px',
                height: '$height-md',
                padding: '$sp-06',
                lineHeight: '100%',
              }}
            />
          </Box>
          {showError && (
            <Box
              css={{
                marginBottom: '$sp-20',
              }}
            >
              <Text
                css={{
                  color: 'rgba(222, 14, 14, 0.9)',
                }}
              >
                이미 사용 중인 필명입니다. 다른 필명을 사용해주세요.
              </Text>
            </Box>
          )}
          <Button
            color="primary"
            size="lg"
            css={{
              cursor: 'pointer',
            }}
            onClick={onPenNameRegist}
          >
            등록하기
          </Button>
        </Box>
      </Box>
    </>
  );
};
PenName.auth = true;
export default PenName;
