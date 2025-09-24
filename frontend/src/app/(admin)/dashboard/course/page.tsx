import { auth } from "@/auth";
import CourseTable from "@/components/admin/course/course.table";
import { sendRequest } from "@/utils/api";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const ManageCoursePage = async (props: IProps) => {

    const page = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 10;
    const search = props?.searchParams?.search ?? "";
    const session = await auth();

    const res = await sendRequest<any>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/all`,
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
            next: { tags: ['list-courses'] }
        }
    })
    
    return (
        <div>
            <CourseTable
                items={res?.data.items ?? []}
                paginationMeta={res?.data.paginationMeta}
            />
        </div>
    )
}

export default ManageCoursePage