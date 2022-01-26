import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'td';

const StyledTitleTd = styled(DEFAULT_TAG, {
  backgroundColor: '#F0F0F0',
  padding: '0',
  borderBottom: '1px solid #ffffff',
});

type TitleTdProps = StitchesProps<typeof StyledTitleTd> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const TitleTd = (props: TitleTdProps) => {
  return <StyledTitleTd {...props}>{props.children}</StyledTitleTd>;
};
