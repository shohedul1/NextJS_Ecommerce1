import { NextAuthOptions, Session, Profile as NextAuthProfile, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connect from "../mongdb/database";
import User from "../model/User";

// Extend the Profile type to include the picture property
interface Profile extends NextAuthProfile {
    picture?: string;
}

// Extend the Session type to include id in user
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            picture?: string | null;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.log("Missing credentials");
                    throw new Error("Invalid Email or Password");
                }

                await connect();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    console.log("User not found");
                    throw new Error("Invalid Email or Password");
                }

                const isMatch = await compare(credentials.password, user.password);

                if (!isMatch) {
                    console.log("Password mismatch");
                    throw new Error("Invalid Email or Password");
                }

                return user;
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session }: { session: Session }) {
            if (session.user?.email) {
                const sessionUser = await User.findOne({ email: session.user.email });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                    session.user = { ...session.user, ...sessionUser.toObject() };
                }
            }

            return session;
        },

        async signIn({ account, profile }) {
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    await connect();

                    // console.log('Profile:', profile); // Log the profile object

                    let user = await User.findOne({ email: profile?.email });

                    if (!user) {
                        user = await User.create({
                            email: profile?.email,
                            name: profile?.name || '',
                            image: (profile as Profile)?.picture || '', // Type assertion
                            password: 'random-generated-password',
                        });
                    }

                    return true;
                } catch (err: any) {
                    console.log("Error checking if user exists: ", err.message);
                    return false;
                }
            }

            return true;
        },
    },
};
