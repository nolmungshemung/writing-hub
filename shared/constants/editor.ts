export const modules = {
  toolbar: {
    // 툴바에 넣을 기능
    container: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
    ],
  },
};

export const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
];
