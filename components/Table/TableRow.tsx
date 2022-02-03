import { StitchesProps, styled } from '@nolmungshemung/ui-kits';
import React from 'react';

const DEFAULT_TAG = 'tr';

const StyledTableRow = styled(DEFAULT_TAG, {
  borderBottom: '1px solid #F0F0F0',
});

type TableRowProps = StitchesProps<typeof StyledTableRow> &
  JSX.IntrinsicElements[typeof DEFAULT_TAG];

export const TableRow = (props: TableRowProps) => {
  return <StyledTableRow {...props}>{props.children}</StyledTableRow>;
};
