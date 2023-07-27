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
        signIn: '/signin'
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
                    let name = user.email?.split('@')[0];

                    // Check if username already exists
                    const existingUser = await prisma!.user.findFirst({
                        where: {
                            name: name
                        }
                    });

                    if (existingUser) {
                        // Append a random 4 digit number if username exists
                        const randomNum = Math.floor(Math.random() * 9000) + 1000;
                        name = `${name}${randomNum}`;
                    }

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
        async jwt({ token, trigger, user, account, session }) {
            if (account && user) { // This block runs when the user logs in
                const jwtPayload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    color: user.color,
                    role: 'ROLE_USER',
                    timestamp: Math.floor(Date.now() / 1000)
                };
                const jwtToken = jwt.sign(jwtPayload, JWT_SECRET, {
                    expiresIn: '6h'
                });
                return { ...token, ...jwtPayload, accessToken: jwtToken };
            }

            if (trigger === "update" && session) {
                const jwtPayload = {
                    id: session.id,
                    name: session.name,
                    email: session.email,
                    color: session.color,
                    role: 'ROLE_USER',
                    timestamp: Math.floor(Date.now() / 1000)
                };
                const jwtToken = jwt.sign(jwtPayload, JWT_SECRET, {
                    expiresIn: '6h'
                });
                token = { ...token, ...jwtPayload, accessToken: jwtToken };
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
                    timestamp: Math.floor(Date.now() / 1000)

                };

                const refreshedToken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '6h' });
                token.accessToken = refreshedToken;
            }


            session.accessToken = token.accessToken as string;
            return session;
        }
    },

})

export { handler as GET, handler as POST }