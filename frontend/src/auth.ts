import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";
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

                if(res.statusCode === 201){
                    console.log('Đăng nhập thành công')
                    return {
                        id: res.data?.user.id,
                        email: res.data?.user.email,
                        role: res.data?.user.role,
                        accessToken: res.data?.accessToken,
                    }
                } else if(+res.statusCode === 400) {
                    throw new InvalidEmailPasswordError()
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
        }, // Lưu vào cookie
        authorized: async({auth}) => {
            return !!auth
        }
    },
    secret: process.env.SECRET
})

