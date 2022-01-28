import { Box } from '@nolmungshemung/ui-kits';
import { Writer } from '~/data/services/services.model';
import { styled } from '../../stitches.config';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledCard = styled(Box, {
  display: 'inline-block',
  outline: '1px black solid',
  width: '17.875rem',
  height: '17.875rem',
});

const StyledCardHeader = styled(Box, {});

const StyledLanguage = styled('span', {
  fontSize: '0.75rem',
});

const StyledTitle = styled(Box, {
  fontSize: '1.125rem',
});

const StyledThumbnail = styled(Box, {
  fontSize: '0.875rem',
});

const StyledIntro = styled(Box, {
  fontSize: '0.75rem',
});

const StyledWriter = styled(Box, {
  fontSize: '0.75rem',
});

const StyledTranslatedIcon = styled('span', {
  fontSize: '0.75rem',
  outline: '1px gray solid',
});

const renderTranslate = (isTranslate?: boolean) => {
  if (isTranslate === undefined) return <Skeleton />;
  else
    return (
      <StyledTranslatedIcon>
        {isTranslate ? '번역' : '원문'}
      </StyledTranslatedIcon>
    );
};

interface CardProps {
  contentsId?: number;
  title?: string;
  thumbnail?: string;
  introduction?: string;
  isTranslate?: boolean;
  language?: string;
  writer?: Writer;
}

const Card = function ({
  contentsId,
  title,
  thumbnail,
  introduction,
  isTranslate,
  language,
  writer,
}: CardProps) {
  return (
    <StyledCard id={contentsId ?? Math.floor(1000)}>
      <StyledCardHeader>
        {renderTranslate(isTranslate)}
        <StyledLanguage>{language ?? <Skeleton />}</StyledLanguage>
      </StyledCardHeader>
      <StyledTitle>{title ?? <Skeleton />}</StyledTitle>
      <StyledThumbnail>{thumbnail ?? <Skeleton />}</StyledThumbnail>
      <StyledIntro>{introduction ?? <Skeleton />}</StyledIntro>
      <StyledWriter>{writer?.writerName ?? <Skeleton />}</StyledWriter>
    </StyledCard>
  );
};

export default Card;
