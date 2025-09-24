import { Modal } from 'antd';
import { Card, Descriptions } from 'antd';

interface Istudent {
    id: number;
    fullName: string;
    dob: string;
    address: string;
    email: string;
    phone: string;
    studentClasses: any[];
}

interface IProps {
    student: Istudent | null;
    isDetailModalOpen: boolean;
    setIsDetailModalOpen: (v: boolean) => void;
}

const StudentDetail = ({ student, isDetailModalOpen, setIsDetailModalOpen }: IProps) => {
    return (
        <Modal
            title="Chi tiết học sinh"
            open={isDetailModalOpen}
            onCancel={() => setIsDetailModalOpen(false)}
            footer={null}
            maskClosable={false}
        >
            {student && (
                <Descriptions column={1}>
                    <Descriptions.Item label="ID">{student.id}</Descriptions.Item>
                    <Descriptions.Item label="Họ tên">{student.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">{student.dob}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{student.address}</Descriptions.Item>
                    <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{student.phone}</Descriptions.Item>
                    <Descriptions.Item label="Lớp học">
                        {student.studentClasses && student.studentClasses.length > 0 ? (
                            student.studentClasses.map((cls: any, idx: number) => (
                                <div key={idx}>
                                    Lớp: {cls.classId} - Điểm tổng kết{cls.finalMark}
                                </div>
                            ))
                        ) : (
                            <span>Chưa có lớp học</span>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
};

export default StudentDetail;