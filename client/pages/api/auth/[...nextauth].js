import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = token.sub;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        }
       
    },
    pages: {
        signIn: "/login",
        signOut: "/",
        error: "/login",
        verifyRequest: "/login",
        newUser: "/signup",
    },
    debug: process.env.NODE_ENV === "development",

}

export default NextAuth(authOptions)

        