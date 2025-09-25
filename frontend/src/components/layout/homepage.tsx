'use client'

import { CrownOutlined } from "@ant-design/icons"
import { Result } from "antd"
import Link from "next/link"

const HomePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <Result
                icon={<CrownOutlined />}
                title="Trung tâm A"
            />
            <div><Link href = "auth/login">Đăng nhập</Link></div>
            <div><Link href = "auth/register">Đăng ký làm admin</Link>
        </div></div>
    )
}

export default HomePage;

