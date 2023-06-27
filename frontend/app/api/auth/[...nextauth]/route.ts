import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/prisma"
import jwt from "jsonwebtoken";
import { Adapter } from "next-auth/adapters";
import { generateRandomColor } from "@/app/utils/colors";


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma!) as Adapter,
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
    pages: {
        signIn: '/auth/signin', // Tell NextAuth.js to use your custom sign-in page
    },
    events: {
        async signIn(message) {
            if (message?.user?.id) {
                const user = await prisma!.user.findUnique({
                    where: {
                        id: message.user.id,
                    },
                });

                if (user) {
                    const name = user.email?.split('@')[0];
                    const color = generateRandomColor();
                    await prisma!.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            name: name,
                            color: color,
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
        async jwt({ token, user, account }) {
            if (account && user) { // This block runs when the user logs in
                const jwtPayload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    color: user.color,
                    role: 'ROLE_USER',
                };
                const jwtToken = jwt.sign(jwtPayload, JWT_SECRET, {
                    expiresIn: '6h'
                });
                return { ...token, ...jwtPayload, accessToken: jwtToken };
            }
            return token;
        }

        ,
        async session({ session, token, user }) {

            session.user = {
                ...session.user,
                id: token.id as string,
                color: token.color as string,
            };
            const currentTime = Math.floor(Date.now() / 1000);

            // Decode the accessToken to check its expiration
            const decodedAccessToken = jwt.decode(token.accessToken as string);

            if (decodedAccessToken && typeof decodedAccessToken !== 'string' && 'exp' in decodedAccessToken && currentTime >= decodedAccessToken.exp!) {
                console.log('Refreshing token');

                const jwtPayload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    color: user.color,
                    role: 'ROLE_USER',
                };

                const refreshedToken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '24h' });
                token.accessToken = refreshedToken;
            }


            session.accessToken = token.accessToken as string;
            return session;
        }
    },

})

export { handler as GET, handler as POST }