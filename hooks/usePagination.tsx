import { useState } from 'react';
import { PagingParams } from '~/data/services/services.model';

export function usePagination<T extends PagingParams>(initialState: T) {
  const [page, setPage] = useState<T>(initialState);
  const handleSetPage = (_page: number) => {
    if (_page !== page.page) {
      setPage((prev) => ({ ...prev, page: _page }));
    }
  };
  return {
    page,
    handleSetPage,
  };
}
