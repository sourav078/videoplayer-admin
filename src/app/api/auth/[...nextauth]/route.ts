import NextAuth, { User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import config from "@/config";

import { cookies } from "next/headers";
interface ExtendedUser extends User {
  accessToken?: string;
  refreshToken?: string;
  role?: string[];
  name: string;
  email: string;
  image: string;
  userType?: string;
}

const handler = NextAuth({
  providers: [
    // google
    // GoogleProvider({
    //   clientId: config.googleClientId as string,
    //   clientSecret: config.googleClientSecret as string,
    // }),

    // credentials
    CredentialsProvider({
      id: "kid-backend",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Phone / E-Mail",
          type: "text",
        },
        mobile_number: {
          label: "Phone / E-Mail",
          type: "text",
        },

        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const isEmail = credentials?.email?.includes("@");
        const loginData = {
          password: credentials?.password,
          [isEmail ? "email" : "mobile_number"]: isEmail
            ? credentials?.email
            : credentials?.mobile_number,
          redirect: false,
        };

        try {
          const res = await fetch(`${config.apiBaseUrl}/auth/admin-login`, {
            method: "POST",
            body: JSON.stringify(loginData),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();

          if (res && data?.data?.accessToken) {
            // set token to Cookies
            cookies().set("token", data?.data?.accessToken);

            return data;
          } else {
            cookies().delete("token");
            throw new Error(data?.message);
          }
        } catch (error: any) {
          cookies().delete("token");
          console.log("~ file: route.ts ~ line 74 ~ authorize ~ error:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.type === "oauth") {
        try {
          const payload = {
            name: user?.name!,
            email: user?.email!,
            image: user?.image!,
            provider: account?.provider!,
          };

          //   here i can do anything with the user data
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
      // verification for other providers that don't have `email_verified`
      return true;
    },
    async jwt({ token, user, account, profile, trigger, session }: any) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
          ...account,
          ...profile,
        };
      }

      if (user) {
        token.userType = user.userType;
        return {
          ...token,
          ...user,
          ...account,
          ...profile,
        };
      }

      return {
        ...token,
        ...user,
        ...account,
        ...profile,
      };
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.userType = token.userType;

        return {
          ...session,
          user: token,
        };
      }

      return {
        ...session,
        user: token,
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
});

export { handler as GET, handler as POST };
