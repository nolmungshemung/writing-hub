import { globalCss } from '@nolmungshemung/ui-kits';
import { reset } from 'stitches-reset';

globalCss({
  ...reset,
  html: {
    height: '100%',
  },
  body: {
    ...reset.body,
    height: '100%',
    fontFamily: '$noto',
  },
  '#__next': {
    height: '100%',
  },
})();
