import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InactiveAccountError, InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";
import Password from "antd/es/input/Password";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                const res = await sendRequest<IBackendRes<ILogIn>>({
                    method: "POST",
                    url: "http://localhost:4000/api/v1/auth/login",
                    body: {
                        email: credentials.email,
                        password: credentials.password,
                        role: 'admin'
                    }
                })

                if(!res.statusCode){
                    return {
                        id: res.data?.user.id,
                        email: res.data?.user.email,
                        role: res.data?.user.role,
                        accessToken: res.data?.accessToken,
                    }
                } else if(+res.statusCode === 401) {
                    throw new InvalidEmailPasswordError()
                } else if(+res.statusCode === 400) {
                    throw new InactiveAccountError()
                } else {
                    throw new Error('Lỗi máy chủ')
                }

                return user;
            
            },
        }),
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        jwt({token, user}) {
            if(user) {
                token.user = (user as IUser);
            }
            return token
        },
        session({session, token}) {
            (session.user as IUser) = token.user
            return session
        }
    },
    secret: process.env.SECRET
})

