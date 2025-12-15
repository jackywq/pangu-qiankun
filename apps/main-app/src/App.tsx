import React, { useState } from "react";
import { Layout, theme } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import AppMenu from "./components/AppMenu";
import RouteContent from "./routes/RouteContent";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px 0",
            }}
          >
            <img
              src="/assets/logo.png"
              alt="盘古软件 Logo"
              style={{ height: 32, marginBottom: "8px" }}
            />
            <div
              style={{ color: "#fff", fontSize: "14px", fontWeight: "bold" }}
            >
              盘古软件
            </div>
          </div>
          <AppMenu />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              paddingLeft: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>盘古软件 - 企业级项目管理系统</h2>
          </Header>
          <Content style={{ margin: "16px", background: "#f0f2f5" }}>
            <RouteContent />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            盘古软件 ©2025 版权所有
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
