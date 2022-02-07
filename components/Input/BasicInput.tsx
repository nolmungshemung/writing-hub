import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'input';

const StyledBasicInput = styled(DEFAULT_TAG, {
  width: '100%',
  height: '100%',
  padding: '0',
  border: 'none',
  fontSize: '$ft-15',
  lineHeight: '$base',
  caretColor: '$d_gray',
  fontFamily: '$noto',

  '&::placeholder': {
    color: '#999999',
  },

  '&:focus': {
    outline: 'none',
    '&::-webkit-input-placeholder': {
      color: 'transparent',
    },
    '&:-moz-placeholder': {
      color: 'transparent',
    },
    '&::-moz-placeholder': {
      color: 'transparent',
    },
    '&:-ms-input-placeholder': {
      color: 'transparent',
    },
  },
});

type BasicInputProps = StitchesProps<typeof StyledBasicInput> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const BasicInput = (props: BasicInputProps) => {
  return <StyledBasicInput {...props}>{props.children}</StyledBasicInput>;
};
