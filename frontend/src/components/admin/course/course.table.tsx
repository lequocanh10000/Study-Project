'use client'
import { handleDetailCourseAction, handleDeleteCourseAction } from "@/utils/actions";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, notification, Popconfirm, Table, TablePaginationConfig, TableProps } from "antd"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import CourseCreate from "./course.create";
import CourseDetail from "./course.detail";


interface IProps {
    items: any
    paginationMeta: {
        current: number,
        limit: number,
        pages: number,
        total: number
    }
}


const CourseTable = (props: IProps) => {
    const { items, paginationMeta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailData, setDetailData] = useState<any>(null);


    const columns = [
        {
            title: "STT",
            render: (_: any, record: any, index: any) => {
                return (
                    <>{(index + 1) + (paginationMeta.current - 1) * (paginationMeta.limit)}</>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên khóa',
            dataIndex: 'name',
        },
        {
            title: 'Số tiết học',
            dataIndex: 'numberSessions',
        },
        {
            title: 'Actions',
            render: (text: any, record: any, index: any) => {
                return (
                    <>
                        <EyeTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={async () => {
                                const res = await handleDetailCourseAction(record?.id)
                                if (res.statusCode === 403) {
                                    notification.error({ message: 'Bạn không thể xem thông tin khóa học ở đây' })
                                    return
                                }
                                setDetailData(res?.data); // lưu dữ liệu chi tiết
                                setIsDetailModalOpen(true); // mở modal
                            }}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa khóa học"}
                            description={"Bạn có chắc chắn muốn xóa khóa học này ?"}
                            onConfirm={async () => {
                                const res = await handleDeleteCourseAction(record?.id)
                                if (res.statusCode === 403) {
                                    notification.error({ message: 'Bạn không thể xóa khóa học' })
                                    return
                                }
                            }}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams as any);
            params.set('page', pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    const onSearch = (value: string) => {
        const params = new URLSearchParams(searchParams as any);
        if(value) {
            params.set('search', value)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`);
    }


    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Quản lý khóa học</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>Tạo mới</Button>
            </div>
            <Input.Search
                placeholder="Nhập tên khóa học tại đây"
                allowClear
                onSearch={onSearch}
                style={{ width: 300 }}
            />
            <Table
                bordered
                dataSource={items}
                columns={columns}
                rowKey={"id"}
                pagination={{
                    current: paginationMeta.current,
                    pageSize: paginationMeta.limit,
                    showSizeChanger: true,
                    total: paginationMeta.total,
                    showTotal: (total, range) => {
                        return <div>{range[0]}–{range[1]} trên {total} khóa học</div>
                    }
                }}
                onChange={onChange}
            />


            <CourseCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <CourseDetail
                course={detailData}
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
            />


        </>
    )
}

export default CourseTable;