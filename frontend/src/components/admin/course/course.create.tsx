import { handleCreateCourseAction } from '@/utils/actions';
import {
    Modal, Input, Form, Row, Col, message,
    notification
} from 'antd';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CourseCreate = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen
    } = props;

    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);

    }

    const onFinish = async (values: any) => {
        const res = await handleCreateCourseAction(values);
        if (res?.statusCode === 201) {
            handleCloseCreateModal();
            message.success(`Tạo lớp học thành công`)
        } else {
            notification.error({
                message: "Tạo lớp học thất bại",
                description: res?.message
            })
        }

    };

    return (
        <Modal
            title="Add new student"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={[15, 15]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên khóa học"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Số tiết"
                            name="numberSessions"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiết học' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default CourseCreate;
