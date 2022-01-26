import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'table';

const StyledTableWrapper = styled(DEFAULT_TAG, {
  margin: 'auto',
  borderCollapse: 'collapse',
});

type WrapperProps = StitchesProps<typeof StyledTableWrapper> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const Wrapper = (props: WrapperProps) => {
  return <StyledTableWrapper {...props}>{props.children}</StyledTableWrapper>;
};
