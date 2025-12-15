import React from "react";
import { Layout, theme } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContent from "./routes/RouteContent";
import SiderMenu from "./components/SiderMenu";
import HeaderMenu from "./components/HeaderMenu";
const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderMenu />
        <Layout>
          <HeaderMenu />
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
