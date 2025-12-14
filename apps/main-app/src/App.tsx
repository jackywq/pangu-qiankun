
import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e: any) => {
    // 简单路由跳转，实际项目推荐用 react-router-dom 的 useNavigate
    window.history.pushState(null, '', e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
          <img src="/assets/logo.png" alt="FRVC Logo" style={{ height: 32, marginBottom: '8px' }} />
          <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>盘古软件</div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['/react']} mode="inline" onClick={handleMenuClick} items={[
           { key: '/react', icon: <PieChartOutlined />, label: 'React Sub App' },
           { key: '/vue', icon: <DesktopOutlined />, label: 'Vue Sub App' },
        ]} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, paddingLeft: 20 }}>
          <h2>企业级微前端基座 (Vite + React)</h2>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div id="subapp-viewport" style={{ minHeight: 360, background: colorBgContainer }}></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Micro Frontend Architecture ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
