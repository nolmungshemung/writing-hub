import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'input';

const StyledBasicInput = styled(DEFAULT_TAG, {
  width: '100%',
  border: '0',
  padding: '0',
});

type BasicInputProps = StitchesProps<typeof StyledBasicInput> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const BasicInput = (props: BasicInputProps) => {
  return <StyledBasicInput {...props}>{props.children}</StyledBasicInput>;
};
