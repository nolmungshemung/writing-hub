import { memo } from 'react';
import { Contents, MainContentsResponse } from '~/data/services/services.model';
import { SuccessResponse } from '~/shared/types';
import Card from './Card';

interface CardListProps {
  pages: SuccessResponse<MainContentsResponse>[];
  onCardClick: (contentsId: number) => void;
}

const CardList = ({ pages, onCardClick }: CardListProps) => {
  return (
    <>
      {pages.map((page) =>
        page.data.mainContentsList.map((contents: Contents) => (
          <Card
            {...contents}
            key={contents.contentsId}
            onCardClick={onCardClick}
          />
        )),
      )}
    </>
  );
};

export default memo(CardList);
