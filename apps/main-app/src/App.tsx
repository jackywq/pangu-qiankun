
import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import { PieChartOutlined, DesktopOutlined, BarChartOutlined, FileTextOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// 主应用路由组件
const HomePage = () => {
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
      <h1>欢迎使用盘古软件</h1>
      <p>盘古软件是一款企业级项目管理系统，提供项目管理、任务跟踪、数据分析等功能。</p>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '16px', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
          <h3>项目管理</h3>
          <p>创建和管理企业项目，分配资源和任务</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
          <h3>任务跟踪</h3>
          <p>跟踪任务进度，管理团队工作</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
          <h3>数据分析</h3>
          <p>生成报表，分析项目数据</p>
        </div>
      </div>
    </div>
  );
};

// 项目管理页面（主应用）
const ProjectManagementPage = () => {
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
      <h1>项目管理（主应用）</h1>
      <p>这里是主应用的项目管理功能，可以管理所有子应用的项目</p>
    </div>
  );
};

// 路由内容组件
const RouteContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 子应用容器
  const SubAppContainer = () => {
    return <div id="subapp-viewport" style={{ minHeight: 360, background: '#fff', borderRadius: '8px', padding: '16px' }}></div>;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project" element={<ProjectManagementPage />} />
      <Route path="/react/*" element={<SubAppContainer />} />
      <Route path="/vue/*" element={<SubAppContainer />} />
    </Routes>
  );
};

// 菜单组件
const AppMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  // 根据当前路径确定选中的菜单项
  const getSelectedKeys = () => {
    if (location.pathname.startsWith('/react')) return ['/react'];
    if (location.pathname.startsWith('/vue')) return ['/vue'];
    return [location.pathname] || ['/'];
  };

  return (
    <Menu 
      theme="dark" 
      selectedKeys={getSelectedKeys()} 
      mode="inline" 
      onClick={handleMenuClick} 
      items={[
        { key: '/', icon: <PieChartOutlined />, label: '首页' },
        { key: '/project', icon: <FileTextOutlined />, label: '项目管理' },
        { key: '/react', icon: <BarChartOutlined />, label: '项目与任务' },
        { key: '/vue', icon: <DesktopOutlined />, label: '数据分析' },
      ]}
    />
  );
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
            <img src="/assets/logo.png" alt="盘古软件 Logo" style={{ height: 32, marginBottom: '8px' }} />
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>盘古软件</div>
          </div>
          <AppMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, paddingLeft: 20, display: 'flex', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>盘古软件 - 企业级项目管理系统</h2>
          </Header>
          <Content style={{ margin: '16px', background: '#f0f2f5' }}>
            <RouteContent />
          </Content>
          <Footer style={{ textAlign: 'center' }}>盘古软件 ©2025 版权所有</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
