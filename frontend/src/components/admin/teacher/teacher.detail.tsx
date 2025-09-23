import { Modal } from 'antd';
import { Card, Descriptions } from 'antd';

interface ITeacher {
    id: number;
    fullName: string;
    dob: string;
    address: string;
    email: string;
    phone: string;
    graduationPlace: string;
    expYear: number;
    teacherClasses: any;
}

interface IProps {
    teacher: ITeacher | null;
    isDetailModalOpen: boolean;
    setIsDetailModalOpen: (v: boolean) => void;
}

const TeacherDetail = ({ teacher, isDetailModalOpen, setIsDetailModalOpen }: IProps) => {
    return (
        <Modal
            title="Chi tiết giáo viên"
            open={isDetailModalOpen}
            onCancel={() => setIsDetailModalOpen(false)}
            footer={null}
            maskClosable={false}
        >
            {teacher && (
                <Descriptions column={1}>
                    <Descriptions.Item label="ID">{teacher.id}</Descriptions.Item>
                    <Descriptions.Item label="Họ tên">{teacher.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">{teacher.dob}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{teacher.address}</Descriptions.Item>
                    <Descriptions.Item label="Email">{teacher.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{teacher.phone}</Descriptions.Item>
                    <Descriptions.Item label="Nơi tốt nghiệp">{teacher.graduationPlace}</Descriptions.Item>
                    <Descriptions.Item label="Năm kinh nghiệm">{teacher.expYear}</Descriptions.Item>
                    <Descriptions.Item label="Lớp đang dạy">
                        {teacher.teacherClasses && teacher.teacherClasses.length > 0 ? (
                            teacher.teacherClasses.map((cls: any, idx: number) => (
                                <div key={idx}>
                                    Lớp: {cls.classId} - Ngày dạy: {cls.teachingDate}
                                </div>
                            ))
                        ) : (
                            <span>Chưa có lớp dạy</span>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
};

export default TeacherDetail;