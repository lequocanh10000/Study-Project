import { handleCreateStudentAction } from '@/utils/actions';
import {
    Modal, Input, Form, Row, Col, message,
    notification
} from 'antd';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const StudentCreate = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen
    } = props;

    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);

    }

    const onFinish = async (values: any) => {
        const res = await handleCreateStudentAction(values);
        if (res?.statusCode === 201) {
            handleCloseCreateModal();
            message.success(`Tạo học sinh thành công`)
        } else {
            notification.error({
                message: "Tạo học sinh thất bại",
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
                            label="Họ tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Ngày sinh"
                            name="dob"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input type="email" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                { pattern: /^0\d{9,11}$/, message: 'Số điện thoại không hợp lệ!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>


                    
                </Row>
            </Form>
        </Modal>
    )
}

export default StudentCreate;
