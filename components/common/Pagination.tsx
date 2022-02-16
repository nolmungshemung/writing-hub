import { styled } from '@nolmungshemung/ui-kits';

type PaginationProps = {
  totalPages: number;
  displayAmount: number;
  currentPage: number;
  setPage: (page: number) => void;
};

const StyeldPagination = styled('nav', {
  width: '40rem',
  textAlign: 'center',
  '& button': {
    width: '$space$sp-32',
    height: '$space$sp-32',
    margin: '0 $sp-04',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#999999',
    padding: '0',
    cursor: 'pointer',
    '&.current-page': {
      fontWeight: '$bold',
      color: '$black',
      textDecoration: 'underline',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export function Pagination({
  totalPages,
  displayAmount,
  currentPage,
  setPage,
}: PaginationProps) {
  const pagesStart =
    Math.floor((currentPage - 1) / displayAmount) * displayAmount + 1;

  const pagesArray = () => {
    if (
      Math.floor(totalPages / displayAmount) ===
      Math.floor((currentPage - 1) / displayAmount)
    ) {
      const lastArraySize = Math.floor(totalPages % displayAmount);
      return [
        ...Array(lastArraySize)
          .fill(0)
          .map((_, i) => pagesStart + i),
      ];
    } else {
      return [
        ...Array(displayAmount)
          .fill(0)
          .map((_, i) => pagesStart + i),
      ];
    }
  };

  return (
    <StyeldPagination>
      <button onClick={() => setPage(1)} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pagesArray().map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={page === currentPage ? 'current-page' : ''}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </StyeldPagination>
  );
}
