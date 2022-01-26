import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'td';

const StyledContentsTd = styled(DEFAULT_TAG, {
  display: 'inline-block',
  width: '100%',
  padding: '0 10px 0',
  borderBottom: '1px solid #F0F0F0',
});

type ContentsTdProps = StitchesProps<typeof StyledContentsTd> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const ContentsTd = (props: ContentsTdProps) => {
  return <StyledContentsTd {...props}>{props.children}</StyledContentsTd>;
};
