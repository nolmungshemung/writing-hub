import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,

  /* jest-dom matcher 인식 */
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  /* auto cleanup: 테스트가 끝날 때마다 다음 테스트를 위해 렌더링한 DOM 내용 지워줌 */
  /* 적용 안됨 */
  // setupFiles: ['@testing-library/react/dont-cleanup-after-each'],

  /* 테스트 파일 내 절대경로 지정 */
  /* test 파일을 test 대상과 같은 depth로 두어 상대경로가 더 용이 */
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/mocks/jestMocks/styleMock.ts',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/mocks/jestMocks/fileMock.js',
  },

  /* DOM 테스트 (default: node) */
  testEnvironment: 'jsdom',
};
export default config;
