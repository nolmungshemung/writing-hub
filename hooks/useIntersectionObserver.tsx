import { RefObject, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import { MainContentsResponse } from '~/data/services/services.model';
import { SuccessResponse } from '~/shared/types';

export interface IUseIntersectionObserverProps
  extends IntersectionObserverInit {
  target: RefObject<HTMLDivElement>;
  enabled?: boolean;
  onIntersect: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      SuccessResponse<MainContentsResponse>,
      AxiosError<any, any>
    >
  >;
}

export function useIntersectionObserver({
  root,
  rootMargin = '0px',
  threshold = 1.0,
  target,
  enabled = true,
  onIntersect,
}: IUseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const options = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      options,
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}
