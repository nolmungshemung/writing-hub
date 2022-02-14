import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Text, Button } from '@nolmungshemung/ui-kits';
import { BasicInput } from '~/components/Input';

const PenName: NextPage = function () {
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
          <Button
            color="primary"
            size="lg"
            css={{
              cursor: 'pointer',
            }}
          >
            등록하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PenName;
