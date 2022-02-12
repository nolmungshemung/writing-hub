import { RefObject, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import { SuccessResponse } from '~/shared/types';

export interface IUseIntersectionObserverProps<T = unknown>
  extends IntersectionObserverInit {
  target: RefObject<HTMLDivElement>;
  enabled?: boolean;
  onIntersect: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<SuccessResponse<T>, AxiosError<any, any>>
  >;
}

export function useIntersectionObserver<T>({
  root,
  rootMargin = '0px',
  threshold = 1.0,
  target,
  enabled = true,
  onIntersect,
}: IUseIntersectionObserverProps<T>) {
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
