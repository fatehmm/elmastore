import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import { VerificationEmailTemplate } from "@/app/components/emails/verification-email";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable, users } from "@/server/db/schema";
import { resend } from "./email";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),
    async session({ token, session }) {
      console.log("SESSION WAS HIT");

      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT WAS HIT");
      if (!token || !token.email) throw new Error("Unauthorized");
      const dbUser = await db.query.users.findFirst({
        where: eq(users.email, token.email),
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      sendVerificationRequest: async (params) => {
        const { identifier, url, provider, theme } = params;
        const { host } = new URL(url);
        const { data, error } = await resend.emails.send({
          from: env.EMAIL_FROM,
          to: identifier,
          subject: "Welcome to Elma Store",
          react: VerificationEmailTemplate({
            url: url,
            baseUrl: env.NEXTAUTH_URL,
          }),
          text: "Sign in",
          headers: {
            "X-Entity-Ref-ID": uuid(),
          },
        });

        if (error) {
          throw new Error(`Email(s) (${error.name}) could not be sent`);
        }
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
