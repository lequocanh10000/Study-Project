import { Modal } from 'antd';
import { Card, Descriptions } from 'antd';

interface IClass {
    openingDate: string,
    classRoom: string
}

interface ICourse {
    id: number;
    name: string;
    numberSessions: string;
    classes: IClass[];
}

interface IProps {
    course: ICourse | null;
    isDetailModalOpen: boolean;
    setIsDetailModalOpen: (v: boolean) => void;
}

const CourseDetail = ({ course, isDetailModalOpen, setIsDetailModalOpen }: IProps) => {
    return (
        <Modal
            title="Chi tiết khóa học"
            open={isDetailModalOpen}
            onCancel={() => setIsDetailModalOpen(false)}
            footer={null}
            maskClosable={false}
        >
            {course && (
                <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="ID">{course.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên khóa học">{course.name}</Descriptions.Item>
                    <Descriptions.Item label="Số tiết học">{course.numberSessions}</Descriptions.Item>
                    <Descriptions.Item label="Danh sách lớp học">
                        {course.classes && course.classes.length > 0 ? (
                            course.classes.map((cl, index) => (
                                <div key={index} style={{ marginBottom: 8 }}>
                                    <strong>Phòng học:</strong> {cl.classRoom} <br />
                                    <strong>Ngày khai giảng:</strong> {cl.openingDate} <br />
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

export default CourseDetail;