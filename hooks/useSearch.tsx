import React, { useState } from 'react';

export function useSearch(callback: (keyword: string) => void) {
  const [value, setValue] = useState<string>('');

  const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value ?? '');
  };

  const onEnter = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key === 'Enter') {
      callback(value);
    }
  };

  const onSearch = () => {
    callback(value);
  };

  return { onChange, onEnter, onSearch };
}
