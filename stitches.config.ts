import { createStitches, CSS } from '@stitches/react';

/**
 * @desc const assertion을 이용해 enum처럼 상태관리
 * @see https://blog.toycrane.xyz/typescript%EC%97%90%EC%84%9C-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%83%81%EC%88%98-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-e926db079f9
 */
export const stitchesTokens = {
  media: {
    xs: '(min-width: 320px)',
    sm: '(min-width: 540px)',
    md: '(min-width: 720px)',
    lg: '(min-width: 960px)',
    xl: '(min-width: 1140px)',
    xxl: '(min-width: 1280px)',
  },
  theme: {
    colors: {
      gray: '#C4C7CA',
      primary: '#DBAA49',
      d_gray: '#666666',
    },
    // base: 16px
    space: {
      'sp-00': '0',
      'sp-04': '0.25rem', // 4px
      'sp-06': '0.267rem', // 6px
      'sp-08': '0.5rem', // 8px
      'sp-12': '0.75rem', // 12px
      'sp-16': '1rem', // 16px
      'sp-20': '1.25rem', // 20px
      'sp-24': '1.5rem', // 24px
      'sp-30': '1.875rem', // 30px
      'sp-32': '2rem', // 32px
      'sp-40': '2.5rem', // 40px
      'sp-50': '3.125rem', // 50px
    },
    fontSizes: {
      'ft-12': '0.75rem', // 12px
      'ft-13': '0.8125rem', // 13px
      'ft-14': '0.875rem', // 14px
      'ft-15': '0.938rem', // 15px
      'ft-16': '1rem', // 16px
      'ft-18': '1.125rem', // 18px
      'ft-20': '1.25rem', // 20px
      'ft-24': '1.5rem', // 24px
      'ft-26': '1.625rem', // 26px
      'ft-32': '2rem', // 32px
      'ft-44': '2.75rem', // 44px
      'ft-52': '3.25rem', // 52px
    },
    sizes: {
      'width-xs': '320px',
      'width-sm': '540px',
      'width-md': '720px',
      'width-lg': '960px',
      'width-xl': '1140px',
      'width-xxl': '1280px',
      'height-xs': '1.25rem',
      'height-sm': '1.5rem',
      'height-md': '1.875rem',
      'height-lg': '2.5rem',
      'height-xl': '3.125rem',
    },
    lineHeights: {
      base: '150%',
      lg: '130%',
    },
    fontWeights: {
      thin: '300',
      regular: '400',
      medium: '500',
      bold: '700',
    },
    fonts: {
      roboto: 'Roboto',
      noto: 'Noto Sans KR',
    },
  },
} as const;

export const { styled, css, getCssText, keyframes, theme, globalCss } =
  createStitches(stitchesTokens);

export type StitchesProps<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = CSS & React.ComponentProps<T>;

/**
 * @see https://icerabbit.tistory.com/94
 */
export type StitchesMediaTokens = keyof typeof stitchesTokens.media;
export type StitchesColorTokens = keyof typeof stitchesTokens.theme.colors;
export type StitchesFontWeightTokens =
  keyof typeof stitchesTokens.theme.fontWeights;
