import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    database: process.env.DATABASE_URL,
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    events: {
        async signIn(message) {
            if (message?.user?.id) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: message.user.id,
                    },
                });

                if (user && !user.name) {
                    const username = user.email?.split('@')[0];
                    await prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            name: username,
                        },
                    });
                }
            }
        },
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            const jwtPayload = {
                id: user?.id || token.id,
                email: user?.email || token.email,
                role: 'ROLE_USER',
            };

            if (account) {
                // This block runs when the user logs in
                const jwtToken = jwt.sign(jwtPayload, JWT_SECRET, {
                    expiresIn: '1h' 
                });
                return { ...token, accessToken: jwtToken };
            }

            return token;
        }
        ,
        async session({ session, token, user }) {
            const currentTime = Math.floor(Date.now() / 1000);

            // Decode the accessToken to check its expiration
            const decodedAccessToken = jwt.decode(token.accessToken);

            if (decodedAccessToken && typeof decodedAccessToken.exp === 'number' && currentTime >= decodedAccessToken.exp) {
                console.log('Refreshing token');

                const jwtPayload = {
                    id: token.id,
                    email: token.email,
                    role: 'ROLE_USER'
                };

                const refreshedToken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '1h' });
                token.accessToken = refreshedToken;
            }


            session.accessToken = token.accessToken;
            return session;
        }
    },

})

export { handler as GET, handler as POST }