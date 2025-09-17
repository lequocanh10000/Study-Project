import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log(credentials);
                let user = null
                user = {
                    _id: '123',
                    username: '123',
                    email: '123',
                    isVerify: '123',
                    type: '123',
                    role: '123'
                }
                if(!user) {
                    throw new Error("User not found.")
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login'
    },
    secret: process.env.SECRET
})

