import { Box, styled } from '@nolmungshemung/ui-kits';
import { useEffect, useRef } from 'react';
import { Contents, MainContentsResponse } from '~/data/services/services.model';
import { SuccessResponse } from '~/shared/types';
import Card from './Card';

export const StyledCardList = styled(Box, {
  gridArea: 'result',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  columnGap: '1.5rem',
  rowGap: '0.875rem',
  marginTop: '2.875rem',
});

interface CardListProps {
  resultList: SuccessResponse<MainContentsResponse>;
  createObserver: (target: HTMLDivElement) => void;
}

const CardList = ({ resultList, createObserver }: CardListProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRef.current) createObserver(targetRef.current);
    else console.log('target null!');
  }, []);

  return (
    <>
      <StyledCardList>
        {resultList === (null || undefined)
          ? [...Array(20)].map(() => <Card key={Math.random()} />)
          : resultList.data.mainContentsList.map(
              (search: Contents, index: number) => (
                <Card
                  key={search.contentsId || index}
                  contentsId={search.contentsId}
                  title={search.title}
                  thumbnail={search.thumbnail}
                  introduction={search.introduction}
                  isTranslate={search.isTranslate}
                  language={search.language}
                  writer={search.writer}
                />
              ),
            )}
      </StyledCardList>
      <Box ref={targetRef} />
    </>
  );
};

export default CardList;
