import { handleCreateTeacherAction } from '@/utils/actions';
import {
    Modal, Input, Form, Row, Col, message,
    notification
} from 'antd';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const TeacherCreate = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen
    } = props;

    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);

    }

    const onFinish = async (values: any) => {
        const res = await handleCreateTeacherAction(values);
        if (res?.data) {
            handleCloseCreateModal();
            message.success(`Tạo giáo viên thành công, mật khẩu là ${res.data.password}`)
        } else {
            notification.error({
                message: "Tạo giáo viên thất bại",
                description: res?.message
            })
        }

    };

    return (
        <Modal
            title="Add new teacher"
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

                    <Col span={24}>
                        <Form.Item
                            label="Nơi tốt nghiệp"
                            name="graduationPlace"
                            rules={[{ required: true, message: 'Vui lòng nhập nơi tốt nghiệp!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Số năm kinh nghiệm"
                            name="expYear"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số năm kinh nghiệm!' },
                                //{ type: 'number', min: 1, message: 'Số năm kinh nghiệm phải lớn hơn 0!' }
                            ]}
                        >
                            <Input type="number" min={1} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default TeacherCreate;
