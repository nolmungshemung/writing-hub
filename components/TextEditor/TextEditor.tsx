import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import React from 'react';
import { formats, modules } from '~/shared/constants/editor';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>{'Loading'}</p>,
});

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TextEditor = function (props: TextEditorProps) {
  const onChange = (content: string) => {
    props.onChange(content);
  };

  return (
    <ReactQuill
      value={props.value}
      onChange={onChange}
      formats={formats}
      modules={modules}
      theme="snow"
      style={{
        height: '90%',
        width: '100%',
        marginBottom: '40px',
        overflow: 'auto',
      }}
    />
  );
};

export default TextEditor;
