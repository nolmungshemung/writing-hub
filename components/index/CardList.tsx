import { Box } from '@nolmungshemung/ui-kits';
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
});

interface CardListProps {
  resultList: Contents[];
}

const CardList = function ({ resultList }: CardListProps) {
  return (
    <StyledCardList>
      {resultList.map((search: Contents) => (
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
    </StyledCardList>
  );
};

export default CardList;
