import { Box, styled } from '@nolmungshemung/ui-kits';
import { Writer } from '~/data/services/services.model';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';

const StyledCard = styled(Box, {
  outline: '1px black solid',
  width: '17.875rem',
  height: '17.875rem',
  textAlign: 'center',
});

const StyledCardHeader = styled(Box, {
  display: 'flex',
  height: '$height-xl',
  padding: '$sp-16 0 0 $sp-16',
  color: '#999999',
  marginBottom: '$sp-16',
});

const StyledTranslatedIcon = styled('span', {
  height: '0.8rem',
  fontSize: '$ft-12',
  padding: '$sp-04 $sp-08',
  outline: '1px #CCCCCC solid',
  borderRadius: '2px',
});

const StyledLanguage = styled('span', {
  fontSize: '$ft-12',
  textAlign: 'left',
  paddingTop: '$sp-04',
  paddingLeft: '$sp-08',
});

const StyledTitle = styled(Box, {
  fontSize: '$ft-18',
  fontWeight: '$bold',
  padding: '0 $sp-16',
});

const StyledThumbnail = styled(Box, {
  fontSize: '$ft-14',
  color: '$d_gray',
  display: 'grid',
  lineHeight: '$base',
  gridTemplateColumns: '5% 90% 5%',
  padding: '$sp-12 $sp-16 0',
});

const StyledQuotesRight = styled(RiDoubleQuotesR, {
  marginTop: '$sp-30',
});

const StyledIntro = styled(Box, {
  fontSize: '$ft-12',
  fontWeight: '$thin',
  color: '#999999',
  padding: '0 $sp-16',
  marginTop: '$sp-16',
});

const StyledWriter = styled(Box, {
  fontSize: '$ft-12',
  color: '#999999',
  marginTop: '$sp-20',
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
      <StyledThumbnail>
        <RiDoubleQuotesL />
        {thumbnail ?? <Skeleton />}
        <StyledQuotesRight />
      </StyledThumbnail>
      <StyledIntro>{introduction ?? <Skeleton />}</StyledIntro>
      <StyledWriter>{writer?.writerName ?? <Skeleton />}</StyledWriter>
    </StyledCard>
  );
};

export default Card;
