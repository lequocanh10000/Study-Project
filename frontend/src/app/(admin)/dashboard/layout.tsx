import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSider from "@/components/layout/admin.sider";
import { Layout } from "antd";
import React from "react"

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
         <Layout>
              <AdminSider/>
              <Layout>
                <AdminHeader/>
                    {children}
                <AdminFooter/>
              </Layout>
            </Layout>
    )
}

export default AdminLayout;