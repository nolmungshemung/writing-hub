import {
  StyledCard,
  StyledCardHeader,
  StyledLanguage,
  StyledTitle,
  StyledThumbnail,
  StyledQuotesRight,
  StyledIntro,
  StyledWriter,
} from '~/components/Main/Card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { RiDoubleQuotesL } from 'react-icons/ri';

interface SkeletonCardProps {
  count?: number;
}

export function SkeletonCard({ count = 4 }: SkeletonCardProps) {
  const SkeletonCards = [...Array(count)].map(() => (
    <StyledCard key={Math.random()}>
      <StyledCardHeader>
        <StyledLanguage>
          <Skeleton />
          <Skeleton />
        </StyledLanguage>
      </StyledCardHeader>
      <StyledTitle>
        <Skeleton />
      </StyledTitle>
      <StyledThumbnail>
        <RiDoubleQuotesL />
        <Skeleton />
        <StyledQuotesRight />
      </StyledThumbnail>
      <StyledIntro>
        <Skeleton />
      </StyledIntro>
      <StyledWriter>
        <Skeleton />
      </StyledWriter>
    </StyledCard>
  ));

  return <>{SkeletonCards}</>;
}
