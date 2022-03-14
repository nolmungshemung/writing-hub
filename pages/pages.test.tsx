import Reading from './contents';
import Login from './login';
import MyFeed from './myfeed';
import PenName from './registration/username';
import Translating from './translating';
import Writers from './writers';
import Writing from './writing';

describe('페이지 별 로그인 필수 여부 체크', () => {
  describe('인증 필수 아닌 페이지', () => {
    test('로그인 페이지', () => expect(Login.auth).toBe(false));
    test('컨텐츠 페이지', () => expect(Reading.auth).toBe(false));
    test('작가 페이지', () => expect(Writers.auth).toBe(false));
  });

  describe('인증 필수 페이지', () => {
    test('필명등록 페이지', () => expect(PenName.auth).toBe(true));
    test('내피드 페이지', () => expect(MyFeed.auth).toBe(true));
    test('번역하기 페이지', () => expect(Translating.auth).toBe(true));
    test('글쓰기 페이지', () => expect(Writing.auth).toBe(true));
  });
});
