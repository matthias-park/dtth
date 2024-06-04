import NextAuth from "next-auth";
import linkedin from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

const LINKEDIN_CLIENT_ID = String(process.env.LINKEDIN_CLIENT_ID);
const LINKEDIN_CLIENT_SECRET = String(process.env.LINKEDIN_CLIENT_SECRET);

if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
  throw new Error("Missing LINKEDIN Credentials");
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    linkedin({
      clientId: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: true,
});
