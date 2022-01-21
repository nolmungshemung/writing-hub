import React, { useState } from 'react';

function useSearch(callback: (keyword: string) => void) {
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      callback(value);
    }
  };

  const onClick = (e: React.MouseEvent) => {
    console.log(e);
    callback(value);
  };

  return { onChange, onKeyPress, onClick };
}

export default useSearch;
