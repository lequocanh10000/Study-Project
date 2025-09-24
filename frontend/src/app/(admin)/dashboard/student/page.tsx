import { auth } from "@/auth";
import StudentTable from "@/components/admin/student/student.table";
import { sendRequest } from "@/utils/api";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const ManageStudentPage = async (props: IProps) => {

    const page = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 10;
    const search = props?.searchParams?.search ?? "";
    const session = await auth();

    const res = await sendRequest<any>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/all`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
        queryParams: {
            page,
            limit,
            search
        },
        nextOption: {
            next: { tags: ['list-students'] }
        }
    })
    
    return (
        <div>
            <StudentTable
                items={res?.data.items ?? []}
                paginationMeta={res?.data.paginationMeta}
            />
        </div>
    )
}

export default ManageStudentPage;
