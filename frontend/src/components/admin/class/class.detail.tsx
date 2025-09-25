import { Modal, Descriptions, Tag } from 'antd';

interface IStudentClass {
    studentId: number;
    isExpelled: boolean;
    finalMark: number;
}

interface IClass {
    id: number;
    maxNumber: number;
    openingDate: string;
    learningForm: string;
    classRoom: string;
    isOpened: boolean;
    studentClasses: IStudentClass[];
    course: {
        name: string;
    };
}

interface IProps {
    classData: IClass | null;
    isDetailModalOpen: boolean;
    setIsDetailModalOpen: (v: boolean) => void;
}

const ClassDetail = ({ classData, isDetailModalOpen, setIsDetailModalOpen }: IProps) => {
    return (
        <Modal
            title="Chi tiết lớp học"
            open={isDetailModalOpen}
            onCancel={() => setIsDetailModalOpen(false)}
            footer={null}
            maskClosable={false}
        >
            {classData && (
                <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="ID">{classData.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên khóa học">{classData.course?.name || '—'}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{classData.maxNumber}</Descriptions.Item>
                    <Descriptions.Item label="Ngày khai giảng">{classData.openingDate}</Descriptions.Item>
                    <Descriptions.Item label="Hình thức học">{classData.learningForm}</Descriptions.Item>
                    <Descriptions.Item label="Phòng học">{classData.classRoom}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái lớp học">
                        {classData.isOpened ? (
                            <Tag color="green">Đang mở</Tag>
                        ) : (
                            <Tag color="red">Đã đóng</Tag>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Danh sách học viên">
                        {classData.studentClasses && classData.studentClasses.length > 0 ? (
                            classData.studentClasses.map((sc, index) => (
                                <div key={index} style={{ marginBottom: 8 }}>
                                    <strong>Học sinh ID:</strong> {sc.studentId} <br />
                                    <strong>Điểm tổng kết:</strong> {sc.finalMark} <br />
                                    <strong>Trạng thái:</strong>{" "}
                                    {sc.isExpelled ? (
                                        <Tag color="red">Đã đuổi học</Tag>
                                    ) : (
                                        <Tag color="green">Đang học</Tag>
                                    )}
                                </div>
                            ))
                        ) : (
                            <span>Chưa có học viên</span>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
};

export default ClassDetail;