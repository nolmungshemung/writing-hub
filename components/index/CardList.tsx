import { Box } from '@nolmungshemung/ui-kits';
import { useEffect, useRef } from 'react';
import { Contents } from '~/data/services/services.model';
import { styled } from '../../stitches.config';
import Card from './Card';

const StyledCardList = styled(Box, {
  gridArea: 'result',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  columnGap: '1.5rem',
  rowGap: '0.875rem',
  marginTop: '2.875rem',
});

interface CardListProps {
  resultList: Contents[];
  createObserver: (target: HTMLDivElement) => void;
}

const CardList = ({ resultList, createObserver }: CardListProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRef.current) createObserver(targetRef.current);
    else console.log('target null!');
  }, []);

  return (
    <StyledCardList>
      {resultList === (null || undefined)
        ? [...Array(20)].map(() => <Card key={Math.random()} />)
        : resultList.map((search: Contents) => (
            <Card
              key={search.contentsId}
              contentsId={search.contentsId}
              title={search.title}
              thumbnail={search.thumbnail}
              introduction={search.introduction}
              isTranslate={search.isTranslate}
              language={search.language}
              writer={search.writer}
            />
          ))}
      <Box ref={targetRef} />
    </StyledCardList>
  );
};

export default CardList;
