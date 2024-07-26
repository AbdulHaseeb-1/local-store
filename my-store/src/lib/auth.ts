import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaClient";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials: any): Promise<any> {
        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          return null;
        }

        const isMatched = await bcrypt.compare(password, user?.password);
        if (!isMatched) {
          return null;
        }

        return {
          id: user.user_id,
          name: user?.username,
          email: user?.email,
          role: user?.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.sub;
      }
      return token;
    },
    async session({ session, user, token }: any) {
      // session.user.id = user.user_id;
      session.user.role = token.role;
      session.user.id = token.sub;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "_session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: "_callback",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: "_csrf",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },

  pages: {
    signIn: "admin/auth/login",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
