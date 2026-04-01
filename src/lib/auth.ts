import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_DOMAINS = ["classroomatheneum.be"];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const domain = user.email.split("@")[1];
      return ALLOWED_DOMAINS.includes(domain);
    },
    async session({ session, token }) {
      if (session.user && token.sub) Object.assign(session.user, { id: token.sub });
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Na inloggen altijd naar /modules
      return `${baseUrl}/modules`;
    },
  },
});
