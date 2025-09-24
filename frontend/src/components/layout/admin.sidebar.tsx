'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    TeamOutlined,

} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from 'antd';
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'Trung tâm A',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "teacher",
                    label: <Link href={"/dashboard/teacher"}>Quản lý giáo viên</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "student",
                    label: <Link href={"/dashboard/student"}>Quản lý học sinh</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "class",
                    label: <Link href={"/dashboard/class"}>Quản lý lớp học</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "course",
                    label: <Link href={"/dashboard/course"}>Quản lý khóa học</Link>,
                    icon: <TeamOutlined />,
                },
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapseMenu}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;