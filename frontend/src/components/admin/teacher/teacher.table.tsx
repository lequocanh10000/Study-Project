'use client'
import { handleDeleteTeacherAction, handleDetailTeacherAction } from "@/utils/actions";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import TeacherCreate from "./teacher.create";
import TeacherDetail from './teacher.detail';

interface IProps {
    items: any
    paginationMeta: {
        totalItems: number,
        currentPage: number,
        limit: number,
        totalPages: number
    }
}

const TeacherTable = (props: IProps) => {
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
                    <>{(index + 1) + (paginationMeta.currentPage - 1) * (paginationMeta.limit)}</>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
        },
        {
            title: 'Nơi tốt nghiệp',
            dataIndex: 'graduationPlace',
        },
        {
            title: 'Năm kinh nghiệm',
            dataIndex: 'expYear',
        },
        {
            title: 'Actions',
            render: (text: any, record: any, index: any) => {
                return (
                    <>
                        <EyeTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={async () => {
                                const res = await handleDetailTeacherAction(record?.id)
                                if(res.statusCode === 400){
                                    notification.error({message: 'Bạn không thể xem thông tin giáo viên khác'})
                                    return
                                }
                                setDetailData(res?.data); // lưu dữ liệu chi tiết
                                setIsDetailModalOpen(true); // mở modal
                            }}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa giáo viên"}
                            description={"Bạn có chắc chắn muốn xóa giáo viên này ?"}
                            onConfirm={async () => {
                                const res = await handleDeleteTeacherAction(record?.id)
                                if(res.statusCode === 404) {
                                    notification.error({message: 'Bạn không thể xóa giáo viên'})
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
            const params = new URLSearchParams();
            params.set('current', pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager Teachers</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>Create Teacher</Button>
            </div>
            <Table
                bordered
                dataSource={items}
                columns={columns}
                rowKey={"id"}
                pagination={{
                    current: paginationMeta.currentPage,
                    pageSize: paginationMeta.limit,
                    showSizeChanger: true,
                    total: paginationMeta.totalItems,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                }}
                onChange={onChange}
            />

            <TeacherCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <TeacherDetail
                teacher={detailData}
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
            />


        </>
    )
}

export default TeacherTable;