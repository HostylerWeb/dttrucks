import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import type { user_role } from "@/generated/prisma/client";
import { prisma } from "./prisma";
import { loginSchema } from "./validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await prisma.users.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });

        if (!user?.is_active) {
          return null;
        }

        const passwordValid = await bcrypt.compare(
          parsed.data.password,
          user.password_hash
        );

        if (!passwordValid) {
          return null;
        }

        await prisma.users.update({
          where: { id: user.id },
          data: { last_login_at: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.id = token.id as string;
        session.user.role = token.role as user_role;
      }
      return session;
    },
  },
});

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}
