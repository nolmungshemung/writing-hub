import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Header } from './Header';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

const mockSession: Session = {
  expires: '1',
  user: {
    email: 'test@mail.com',
    name: 'Jest Test',
  },
};

describe('Header Rendering Test', () => {
  beforeEach(() => render(<Header />));

  afterEach(cleanup);

  describe('로그인 상태일 때', () => {
    beforeAll(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });
    });

    test('로그인 버튼이 보인다.', () => {
      const loginButton = screen.getByTestId('login-button');
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('로그아웃 상태일 때', () => {
    beforeAll(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
      });
    });

    test('필명등록 버튼이 보인다.', () => {
      const userNameButton = screen.getByTestId('username-button');
      expect(userNameButton).toBeInTheDocument();
    });

    test('내피드 버튼이 보인다.', () => {
      const myFeedButton = screen.getByTestId('myfeed-button');
      expect(myFeedButton).toBeInTheDocument();
    });

    test('로그아웃 버튼이 보인다.', () => {
      const logoutButton = screen.getByTestId('logout-button');
      expect(logoutButton).toBeInTheDocument();
    });
  });
});
