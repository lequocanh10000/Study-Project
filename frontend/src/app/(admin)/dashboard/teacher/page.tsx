import { auth } from "@/auth";
import TeacherTable from "@/components/admin/teacher/teacher.table";
import { sendRequest } from "@/utils/api";
import { notification } from "antd";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const ManageTeacherPage = async (props: IProps) => {

    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<any>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/all`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
        nextOption: {
            next: { tags: ['list-teachers'] }
        }
    })
    
    
    return (
        <div>
            <TeacherTable
                items={res?.data.items ?? []}
                paginationMeta={res?.data.paginationMeta}
            />
        </div>
    )
}

export default ManageTeacherPage;
