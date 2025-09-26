import { auth } from "@/auth";
import ClassTable from "@/components/admin/class/class.table";
import { sendRequest } from "@/utils/api";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const ManageClassPage = async (props: IProps) => {

    const page = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 10;
    const search = props?.searchParams?.search ?? "";
    const learningDays = props?.searchParams?.learningDays ?? [];
    const session = await auth();

    const res = await sendRequest<any>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class/all`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
        queryParams: {
            page,
            limit,
            search,
            learningDays
        },
        nextOption: {
            next: { tags: ['list-classes'] }
        }
    })
    
    return (
        <div>
            <ClassTable
                items={res?.data.items ?? []}
                paginationMeta={res?.data.paginationMeta}
            />
        </div>
    )
}

export default ManageClassPage;
