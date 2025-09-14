'use client'

import { Layout } from "antd";

const AdminFooter = () => {
    const {Footer} = Layout

    return (
        <Footer style={{ textAlign: 'center' }}>
          Dự án quản lý trung tâm ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    )
}

export default AdminFooter;