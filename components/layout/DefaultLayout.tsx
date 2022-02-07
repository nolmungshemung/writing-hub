import { HTMLAttributes } from 'react';
import { styled } from '@nolmungshemung/ui-kits';

const StyledMainLayout = styled('div', {
  display: 'grid',
  gridTemplateAreas: `
  "header"
  "main"
  `,
  gridTemplateRows: '5rem 1fr',
  height: '100vh',
  margin: 0,
  padding: 0,
});

const MainLayout = (props: HTMLAttributes<HTMLDivElement>) => (
  <StyledMainLayout>{props.children}</StyledMainLayout>
);

export default MainLayout;
