"use client";
import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { HomeOutlined, BarChartOutlined, LogoutOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
const { Header, Content, Footer, Sider } = Layout;
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const onSelectMenu = (e) => {
    console.log(e);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear the authentication token from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    Cookies.remove("authToken");
    Cookies.remove("user");
    // Redirect the user to the login page
    router.push("/sign-in");
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible theme="light" collapsed={collapsed} width={300} onCollapse={(value) => setCollapsed(value)} className="py-4 px-2">
        <div className="demo-logo-vertical" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          {!collapsed && <span style={{ marginTop: "10px" }} className="text-black"></span>}
        </div>
        <Menu theme="light" mode="inline" onClick={onSelectMenu}>
          <Menu.Item key="admin" icon={<HomeOutlined />}>
            <Link href="/admin"></Link>
            Dashboard
          </Menu.Item>
          <Menu.Item key="admin-concert" icon={<BarChartOutlined />}>
            <Link href="/admin/concert"></Link>
            Concert
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: 0,
            paddingRight: 5,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between", // Align items horizontally with space between them
            alignItems: "center",
            // Align items vertically in the center
          }}
        >
          <Title level={5} className="p-5">
            Conve APPS
          </Title>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content className="my-4 mx-4">
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
