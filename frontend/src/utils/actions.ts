'use server'

import { auth, signIn } from "@/auth";
import { revalidateTag } from 'next/cache'
import { sendRequest } from "./api";
import { message, notification } from "antd";

export async function authenticate(email: string, password: string, role: string) {
    try {
        const r = await signIn('credentials', {
            email: email,
            password: password,
            role: role,
            // callbackUrl: '/',
            redirect: false
        })
        return r;
    } catch (error) {
        if ((error as any).name === 'InvalidEmailPasswordError') {
            return {
                error: (error as any).type,
                code: 1
            }
        } else if ((error as any).name === 'InactiveAccountError') {
            return {
                error: (error as any).type,
                code: 2
            }
        } else {
            return {
                error: 'Lỗi máy chủ',
                code: 0
            }
        }
    }
}

export const handleCreateTeacherAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/register`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: { ...data }
    })
    console.log(res)
    revalidateTag("list-teachers")
    return res;
}

export const handleDeleteTeacherAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/delete/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-teachers")
    return res;
}

export const handleDetailTeacherAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/one/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-teachers")
    return res;
}

export const handleCreateStudentAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/create`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: { ...data }
    })
    console.log(res)
    revalidateTag("list-students")
    return res;
}

export const handleDeleteStudentAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/delete/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-students")
    return res;
}

export const handleDetailStudentAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/one/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-students")
    return res;
}

export const handleCreateClassAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class/create`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: { ...data }
    })
    console.log(res)
    revalidateTag("list-classes")
    return res;
}

export const handleDetailClassAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class/one/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-classes")
    return res;
}

export const handleDeleteClassAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class/hard/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-classes")
    return res;
}

export const handleCreateCourseAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/create`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: { ...data }
    })
    console.log(res)
    revalidateTag("list-courses")
    return res;
}

export const handleDetailCourseAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/one/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-courses")
    return res;
}

export const handleDeleteCourseAction = async (id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/delete/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
    })

    revalidateTag("list-courses")
    return res;
}