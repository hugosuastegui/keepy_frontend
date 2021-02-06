import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import "../index.css";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Context } from "../context";
import { logout } from "../services/auth";

const { Content, Sider } = Layout;

function LayoutApp({ children }) {
  const { clearCtxUser, user } = useContext(Context);
  const history = useHistory();

  const logoutProcess = async () => {
    await logout();
    clearCtxUser(user);
    history.push("/login");
  };

  return (
    <Layout className="layout">
      {user && (
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">Logo</Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              {user.projects.length === 0 ? (
                <Link to="/projects/new">New Project</Link>
              ) : (
                <Link to="/projects">Projects</Link>
              )}
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/brief">Brief</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/ledger">Ledger</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />} onClick={logoutProcess}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout style={{ height: "100vh" }}>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
