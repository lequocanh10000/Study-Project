import { handleCreateClassAction } from '@/utils/actions';
import {
    Modal, Input, Form, Row, Col, message,
    notification,
    Select
} from 'antd';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const ClassCreate = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen
    } = props;

    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);

    }

    const onFinish = async (values: any) => {
        const res = await handleCreateClassAction(values);
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
                            label="ID khóa học"
                            name="courseId"
                            rules={[
                                { required: true, message: 'Vui lòng id khóa học' },
                            ]}
                        >
                            <Input type="number"/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Số lượng học sinh"
                            name="maxNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng học sinh' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Ngày khai giảng"
                            name="openingDate"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày khai giảng' }]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Phòng học"
                            name="classRoom"
                            rules={[
                                { required: true, message: 'Vui lòng phòng học' },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Hình thức học"
                            name="learningForm"
                            rules={[{ required: true, message: 'Lựa chọn hình thức học của lớp', },]}
                        >
                            <Select placeholder="Lựa chọn">
                                <Select.Option value="Online">Online</Select.Option>
                                <Select.Option value="Offline">Offline</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    )
}

export default ClassCreate;
