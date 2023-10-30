import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthRepo } from "@/App/Repositories/Auth/AuthRepo"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                const res = await AuthRepo.login(credentials);
                if (res.status === 200) {
                    return res;
                } else {
                    return null;
                }
            }
        }),
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
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                const isUserExist = await AuthRepo.isUserExist(user.email);
                if (isUserExist?.status === 200) {
                    const res = await AuthRepo.login({
                        email: profile.email,
                        password: profile.sub,
                    });
                    if (res.status === 200) {
                        return true;
                    }
                    else {
                        return false;
                    }
                } else {
                    const res = await AuthRepo.register({
                        name: profile.name,
                        email: profile.email,
                        password: profile.sub,
                    });
                    if (res.status === 201) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;

        },
        async session({ session, token, user }) {
            session.user.id = token.sub;
            session.user.name = token.name;
            session.user.email = token.email;
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
    debug: true,

}

export default NextAuth(authOptions)

