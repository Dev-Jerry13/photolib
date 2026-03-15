import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { users } from "@/lib/data";
import { assertAuthEnv } from "@/lib/env";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10)
});

assertAuthEnv();

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const existing = users.find((u) => u.email === parsed.data.email);
        if (!existing || existing.suspended) return null;

        const validPassword = await bcrypt.compare(parsed.data.password, existing.passwordHash);
        if (!validPassword) return null;

        return {
          id: existing.id,
          email: existing.email,
          role: existing.role,
          suspended: existing.suspended
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.suspended = (user as { suspended: boolean }).suspended;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as "admin" | "user") ?? "user";
        session.user.suspended = Boolean(token.suspended);
      }
      return session;
    }
  }
};
