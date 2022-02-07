import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'td';

const StyledContentsTd = styled(DEFAULT_TAG, {
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '0 10px 0',
  alignItems: 'center',
});

type ContentsTdProps = StitchesProps<typeof StyledContentsTd> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const ContentsTd = (props: ContentsTdProps) => {
  return <StyledContentsTd {...props}>{props.children}</StyledContentsTd>;
};
