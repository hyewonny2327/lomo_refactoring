import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
// import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/app/db';

const handler = NextAuth({
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        name: { label: 'name', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.name) {
          return null;
        }

        try {
          // 이메일로 유저 조회
          console.log('이메일로 유저를 조회합니다.');
          let user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          // 유저가 없으면 생성
          if (!user) {
            console.log('유저가 없어서 생성합니다.');
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.name,
              },
            });
          }

          // 반환할 User 객체
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('Error during user authorization:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect() {
      return '/select/0'; // 로그인 후 리디렉션할 페이지
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    jwt: async ({ user, token }) => {
      console.log('jwt, user', user, token);
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
