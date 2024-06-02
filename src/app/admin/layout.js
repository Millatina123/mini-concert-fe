"use client";
import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, ConfigProvider, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { HomeOutlined, BarChartOutlined, LogoutOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
const { Header, Content, Footer, Sider } = Layout;
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { resetApiState } from "@/redux/store";

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["admin"]); // Default selected key
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const onSelectMenu = (e) => {
    console.log(e);
    setSelectedKeys([e.key]); // Update the selected key
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear the authentication token from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    Cookies.remove("authToken");
    Cookies.remove("user");
    resetApiState();
    // Redirect the user to the login page
    router.push("/sign-in");
  };

  // Custom style for Sider background
  const siderStyle = {
    backgroundColor: "#B77BFF", // Custom background color
    bodyBgColor: colorBgContainer,
  };

  // Custom style for the active menu item
  const activeItemStyle = {
    backgroundColor: "#9F59FF", // Custom background color for active item
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <ConfigProvider
        theme={{
          token: {},
        }}
      >
        <Sider collapsible theme="light" collapsed={collapsed} width={300} onCollapse={(value) => setCollapsed(value)} style={siderStyle} className="py-4 px-2">
          <div className="demo-logo-vertical" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
            <img src={"https://aqbgvzzymp.cloudimg.io/v7/barokahabadi.co.id/wp-content/uploads/2020/11/dummy-logo-1b.png"} alt="Logo" className="w-1/2 h-auto " /> {/* Logo */}
          </div>
          <Menu
            theme="light"
            style={{ backgroundColor: "#B77BFF" }}
            className="font-medium"
            mode="inline"
            onClick={onSelectMenu}
            selectedKeys={selectedKeys} // Set the selected keys
          >
            <Menu.Item
              key="admin"
              icon={
                <HomeOutlined
                  style={{
                    fontSize: "18",
                    strokeWidth: "25", // higher value === more thickness the filled area
                    stroke: "white",
                  }}
                />
              }
              style={{ color: "white", fontSize: "16", ...(selectedKeys.includes("admin") ? activeItemStyle : {}) }}
            >
              <Link href="/admin">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="admin-concert"
              icon={
                <BarChartOutlined
                  style={{
                    fontSize: "18",
                    strokeWidth: "25", // higher value === more thickness the filled area
                    stroke: "white",
                  }}
                />
              }
              style={{ color: "white", fontSize: "16", ...(selectedKeys.includes("admin-concert") ? activeItemStyle : {}) }}
            >
              <Link href="/admin/concert">Concert</Link>
            </Menu.Item>
            <Menu.Item
              key="admin-payments"
              icon={
                <BarChartOutlined
                  style={{
                    fontSize: "18",
                    strokeWidth: "25", // higher value === more thickness the filled area
                    stroke: "white",
                  }}
                />
              }
              style={{ color: "white", fontSize: "16", ...(selectedKeys.includes("admin-payments") ? activeItemStyle : {}) }}
            >
              <Link href="/admin/payments">Payments</Link>
            </Menu.Item>
            <Menu.Item
              key="setting-concert"
              icon={
                <BarChartOutlined
                  style={{
                    fontSize: "18",
                    strokeWidth: "25", // higher value === more thickness the filled area
                    stroke: "white",
                  }}
                />
              }
              style={{ color: "white", fontSize: "16", ...(selectedKeys.includes("setting-concert") ? activeItemStyle : {}) }}
            >
              <Link href="/admin/setting-concert">Setting Concert</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </ConfigProvider>
      <Layout>
        <Header
          style={{
            paddingLeft: 0,
            paddingRight: 5,
            background: "#fff",
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
              background: "#fff",
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
