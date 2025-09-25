'use client'
import { handleDetailClassAction, handleDeleteClassAction } from "@/utils/actions";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, notification, Popconfirm, Table, TablePaginationConfig, TableProps } from "antd"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import ClassCreate from "./class.create";
import ClassDetail from "./class.detail";


interface IProps {
    items: any
    paginationMeta: {
        current: number,
        limit: number,
        pages: number,
        total: number
    }
}


const ClassTable = (props: IProps) => {
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
            title: 'Số học sinh',
            dataIndex: 'maxNumber',
        },
        {
            title: 'Ngày khai giảng',
            dataIndex: 'openingDate',
        },
        {
            title: 'Hình thức học',
            dataIndex: 'learningForm',
        },
        {
            title: 'Ngày học trong tuần',
            dataIndex: 'learningDays',
            render: (days: string[]) => days?.join(', ')
        },
        {
            title: 'Phòng học',
            dataIndex: 'classRoom',
        },
        {
            title: 'Mã khóa học',
            dataIndex: 'courseId',
        },
        {
            title: 'Trạng thái lớp',
            dataIndex: 'isOpened',
            render: (isOpened: boolean) => isOpened ? 'Đã mở' : 'Đã đóng',
        },
        {
            title: 'Actions',
            render: (text: any, record: any, index: any) => {
                return (
                    <>
                        <EyeTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={async () => {
                                const res = await handleDetailClassAction(record?.id)
                                if (res.statusCode === 403) {
                                    notification.error({ message: 'Bạn không thể xem thông tin lớp ở đây' })
                                    return
                                }
                                setDetailData(res?.data); // lưu dữ liệu chi tiết
                                setIsDetailModalOpen(true); // mở modal
                            }}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa lớp"}
                            description={"Bạn có chắc chắn muốn đóng lớp này ?"}
                            onConfirm={async () => {
                                const res = await handleDeleteClassAction(record?.id)
                                if (res.statusCode === 403) {
                                    notification.error({ message: 'Bạn không thể đóng lớp học' })
                                    return
                                } else {
                                    notification.success({message: 'Đóng lớp thành công'})
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
                <span>Quản lý lớp học</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>Tạo mới</Button>
            </div>
            <Input.Search
                placeholder="Nhập tên phòng học tại đây"
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
                        return <div>{range[0]}–{range[1]} trên {total} lớp học</div>
                    }
                }}
                onChange={onChange}
            />


            <ClassCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <ClassDetail
                classData={detailData}
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
            />


        </>
    )
}

export default ClassTable;