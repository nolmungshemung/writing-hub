import { memo } from 'react';
import { Box, styled } from '@nolmungshemung/ui-kits';
import { Contents } from '~/data/services/services.model';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';

export const StyledCard = styled(Box, {
  outline: '1px black solid',
  width: '17.875rem',
  height: '17.875rem',
  textAlign: 'center',
});

export const StyledCardHeader = styled(Box, {
  display: 'flex',
  height: '$height-xl',
  padding: '$sp-16 0 0 $sp-16',
  color: '#999999',
  marginBottom: '$sp-16',
});

export const StyledTranslatedIcon = styled('span', {
  height: '0.8rem',
  fontSize: '$ft-12',
  padding: '$sp-04 $sp-08',
  outline: '1px #CCCCCC solid',
  borderRadius: '2px',
});

export const StyledLanguage = styled('span', {
  fontSize: '$ft-12',
  textAlign: 'left',
  paddingTop: '$sp-04',
  paddingLeft: '$sp-08',
});

export const StyledTitle = styled(Box, {
  fontSize: '$ft-18',
  fontWeight: '$bold',
  padding: '0 $sp-16',
});

export const StyledThumbnail = styled(Box, {
  fontSize: '$ft-14',
  color: '$d_gray',
  display: 'grid',
  lineHeight: '$base',
  gridTemplateColumns: '5% 90% 5%',
  padding: '$sp-12 $sp-16 0',
});

export const StyledQuotesRight = styled(RiDoubleQuotesR, {
  marginTop: '$sp-30',
});

export const StyledIntro = styled(Box, {
  fontSize: '$ft-12',
  fontWeight: '$thin',
  color: '#999999',
  padding: '0 $sp-16',
  marginTop: '$sp-16',
});

export const StyledWriter = styled(Box, {
  fontSize: '$ft-12',
  color: '#999999',
  marginTop: '$sp-20',
});

interface CardProps extends Contents {
  onCardClick: (contentsId: number) => void;
}

function Card({
  title,
  thumbnail,
  introduction,
  isTranslate,
  language,
  writer,
  onCardClick,
}: CardProps) {
  return (
    <StyledCard onClick={onCardClick}>
      <StyledCardHeader>
        <StyledTranslatedIcon>
          {isTranslate ? '번역' : '원문'}
        </StyledTranslatedIcon>
        <StyledLanguage>{language}</StyledLanguage>
      </StyledCardHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledThumbnail>
        <RiDoubleQuotesL />
        {thumbnail}
        <StyledQuotesRight />
      </StyledThumbnail>
      <StyledIntro>{introduction}</StyledIntro>
      <StyledWriter>{writer.writerName}</StyledWriter>
    </StyledCard>
  );
}

export default memo(Card);
