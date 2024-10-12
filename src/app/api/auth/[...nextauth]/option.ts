import prisma from '@/DB/db.config';
import { User } from '@prisma/client';
import { AuthOptions, ISODateString } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

export type CustomSession = {
    user?: CustomUser;
    expires: ISODateString;
};

export type CustomUser = {
    id?: string;
    email?: string;
    username?: string;
    name?: string;
};

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: CustomSession; token: JWT }) {
            session.user = token.user as CustomUser;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: { email: string; password: string } | undefined, req) {
                if (!credentials) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        name: true,
                    },
                });

                if (user) {
                    return { ...user, id: user.id.toString() };
                } else {
                    return null;
                }
            }
        })
    ]
};
