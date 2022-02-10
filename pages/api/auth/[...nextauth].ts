/* This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.
https://next-auth.js.org/getting-started/example#add-api-route
*/
import NextAuth from 'next-auth';
import Kakao from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_ID || '',
      clientSecret: process.env.KAKAO_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
});
