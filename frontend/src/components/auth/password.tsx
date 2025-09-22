'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';

const Password = () => {
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { email, password, confirmPassword } = values;
        const res = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/password`,
            method: 'PATCH',
            body: {
                email, password, confirmPassword
            }
        })
        console.log(res);

        if (res.statusCode === 400) {
            notification.error({
                message: 'Lỗi đổi mật khẩu',
                description: res.message
            });
        } else if(res.statusCode === 200) {
            notification.success({
                message: 'Đổi mật khẩu thành công',
                description: 'Bạn sẽ được trở về trang đăng nhập'
            })
            router.push(`/auth/login`);
        } else {
            notification.error({
                message: 'Máy chủ đang gặp sự cố',
                description: res.message
            });
        }

    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đổi mật khẩu</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    
                </fieldset>
            </Col>
        </Row>

    )
}

export default Password;