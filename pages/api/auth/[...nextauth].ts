/* This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.
https://next-auth.js.org/getting-started/example#add-api-route
*/
import { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import Kakao from 'next-auth/providers/kakao';
import { getUserInfo, postUserLogin } from '~/data/user/user.api';
import { WritingHubSession } from '~/data/user/user.model';

export default NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_ID || '',
      clientSecret: process.env.KAKAO_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const { data: userInfo } = await getUserInfo(user.id);
        console.log('Login User: ', userInfo);
      } catch (e) {
        const status = (e as AxiosError)?.response?.status;

        if (status === 404) {
          try {
            await postUserLogin(user.id);
          } catch (err) {
            console.error('user create error:: ', err);
            return false;
          }
        }
      }
      return true;
    },
    async session({ session, token }) {
      const customSession = session as WritingHubSession;

      if (token) {
        customSession.user = {
          ...session.user,
          id: token.sub ?? '',
        };
      }

      return customSession;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
});
