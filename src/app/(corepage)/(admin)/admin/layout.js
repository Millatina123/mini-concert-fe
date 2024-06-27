"use client";
import React, { useEffect, useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, ConfigProvider, Layout, Menu, Dropdown, theme } from "antd";
import Link from "next/link";
import { HomeOutlined, BarChartOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
const { Header, Content, Footer, Sider } = Layout;
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { resetApiState } from "@/redux/store";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["admin"]); // Default selected key
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const [localStorageUser, setLocalStorageUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLocalStorageUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    console.log(localStorageUser); // This will log the updated state value
  }, [localStorageUser]);

  const onSelectMenu = (e) => {
    console.log(e);
    setSelectedKeys([e.key]); // Update the selected key
  };

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    Cookies.remove("authToken");
    Cookies.remove("user");
    resetApiState();
    router.push("/sign-in");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  // Custom style for Sider background
  const siderStyle = {
    backgroundColor: "#eee0ff", // Custom background color
    bodyBgColor: colorBgContainer,
  };

  // Custom style for the active menu item
  const activeItemStyle = {
    backgroundColor: "#9F59FF", // Custom background color for active item
    color: "white",
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="edit-profile" icon={<EditOutlined />}>
        <Link href="/admin/edit-profile">Edit Profile</Link>
      </Menu.Item>
      <Menu.Item key="edit-password" icon={<EditOutlined />}>
        <Link href="/admin/edit-password">Edit Password</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ConfigProvider theme={{ token: {} }}>
        <Sider collapsible theme="light" collapsed={collapsed} width={300} onCollapse={(value) => setCollapsed(value)} style={siderStyle} className="py-4 px-2">
          <div className="demo-logo-vertical" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
            <img src={"/logo_conve.PNG"} alt="Logo" className="w-1/4 h-auto ms-4" /> {/* Logo */}
          </div>
          <Menu
            theme="light"
            style={{ backgroundColor: "#eee0ff" }}
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
              style={{ color: "gray", fontSize: "16", ...(selectedKeys.includes("admin") ? activeItemStyle : {}) }}
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
              style={{ color: "gray", fontSize: "16", ...(selectedKeys.includes("admin-concert") ? activeItemStyle : {}) }}
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
              style={{ color: "gray", fontSize: "16", ...(selectedKeys.includes("admin-payments") ? activeItemStyle : {}) }}
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
              style={{ color: "gray", fontSize: "16", ...(selectedKeys.includes("setting-concert") ? activeItemStyle : {}) }}
            >
              <Link href="/admin/setting-concert">Setting Concert</Link>
            </Menu.Item>
            <Menu.Item
              key="history-concert"
              icon={
                <BarChartOutlined
                  style={{
                    fontSize: "18",
                    strokeWidth: "25", // higher value === more thickness the filled area
                    stroke: "white",
                  }}
                />
              }
              style={{ color: "gray", fontSize: "16", ...(selectedKeys.includes("history-concert") ? activeItemStyle : {}) }}
            >
              <Link href="/admin/history-concert">History Concert</Link>
            </Menu.Item>
            <Menu.Item
              key="history-payment"
              icon={
                <BarChartOutlined
                  style={{
                    fontSize: "18",
                    strokeWidth: "25", // higher value === more thickness the filled area
                    stroke: "white",
                  }}
                />
              }
              style={{ color: "gray", fontSize: "16", ...(selectedKeys.includes("history-payment") ? activeItemStyle : {}) }}
            >
              <Link href="/admin/history-payment">History Payment</Link>
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
          }}
        >
          <Title level={5} className="p-5">
            {localStorageUser ? "HI " + localStorageUser.user.name + " !" : "HI!"}
          </Title>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
          </Dropdown>
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

export default AdminLayout;
