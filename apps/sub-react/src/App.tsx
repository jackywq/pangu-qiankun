import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, theme } from 'antd';
import SubAppMenu from './components/SubAppMenu';
import SubAppRoutes from './components/SubAppRoutes';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Router basename="/react">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} theme="light">
          <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
            <h3 style={{ margin: 0 }}>项目与任务</h3>
          </div>
          <SubAppMenu />
        </Sider>
        <Layout>
          <Content style={{ margin: '16px', background: colorBgContainer }}>
            <SubAppRoutes />
          </Content>
          <Footer style={{ textAlign: 'center', background: colorBgContainer }}>
            React Sub App ©2025
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;