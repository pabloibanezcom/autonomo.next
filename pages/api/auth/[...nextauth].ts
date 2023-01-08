/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '../../../src/api/middleware/mongodb';
import { simpleLogin } from '../../../src/api/services/user';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const user = await simpleLogin(req.query);

        if (user) {
          return { ...user, id: user._id.toString() };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('Callback - signIn');
      // console.log({ user, account, profile, email, credentials });
      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log('Callback - redirect');
      // console.log({ url, baseUrl });
      return baseUrl;
    },
    async session({ session, user, token }) {
      // console.log('Callback - session');
      // console.log({ session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('Callback - jwt');
      // console.log({ token, user, account, profile, isNewUser });
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
};

export default connectDB((req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, authOptions));
