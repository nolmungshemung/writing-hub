import React, { useState } from 'react';

function useSearch(callback: (keyword: string) => void) {
  const [value, setValue] = useState<string>('');

  const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e !== undefined && e !== null) {
      setValue(e.target.value);
    }
  };

  const onEnter = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e !== undefined && e !== null && e.key === 'Enter') {
      callback(value);
    }
  };

  const onSearch = () => {
    callback(value);
  };

  return { onChange, onEnter, onSearch };
}

export default useSearch;
