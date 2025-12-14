
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Card, Button, List, Avatar, Space } from 'antd';
import { ProjectOutlined, ToolOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

// 项目列表页面
const ProjectListPage = () => {
  const navigate = useNavigate();
  
  const projects = [
    { id: 1, name: '企业官网重构', status: '进行中', progress: 65 },
    { id: 2, name: '移动端APP开发', status: '已完成', progress: 100 },
    { id: 3, name: '数据分析系统', status: '计划中', progress: 10 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>项目列表</h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={projects}
        renderItem={(project) => (
          <List.Item>
            <Card title={project.name} extra={<Button type="primary" size="small" onClick={() => navigate(`/projects/${project.id}`)}>查看详情</Button>}>
              <p>状态: {project.status}</p>
              <p>进度: {project.progress}%</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

// 项目详情页面
const ProjectDetailPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>项目详情</h1>
      <Card title="企业官网重构" style={{ marginBottom: '16px' }}>
        <p>项目描述: 对企业官网进行全面重构，提升用户体验和响应式设计。</p>
        <p>负责人: 张三</p>
        <p>团队成员: 李四, 王五, 赵六</p>
      </Card>
      <h2>任务列表</h2>
      <List
        dataSource={[
          { id: 1, title: '首页设计', assignee: '李四', status: '已完成' },
          { id: 2, title: '产品列表开发', assignee: '王五', status: '进行中' },
          { id: 3, title: '后台管理系统集成', assignee: '赵六', status: '计划中' },
        ]}
        renderItem={(task) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{task.assignee.charAt(0)}</Avatar>}
              title={task.title}
              description={`负责人: ${task.assignee} | 状态: ${task.status}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

// 任务管理页面
const TaskManagementPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>任务管理</h1>
      <List
        dataSource={[
          { id: 1, title: '完成用户认证功能', assignee: '李四', priority: '高' },
          { id: 2, title: '修复移动端布局问题', assignee: '王五', priority: '中' },
          { id: 3, title: '添加数据统计报表', assignee: '赵六', priority: '低' },
        ]}
        renderItem={(task) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{task.assignee.charAt(0)}</Avatar>}
              title={task.title}
              description={`负责人: ${task.assignee} | 优先级: ${task.priority}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

// 配置页面
const SettingsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>项目设置</h1>
      <Card title="项目配置">
        <p>这里可以配置项目的各种参数和设置</p>
      </Card>
    </div>
  );
};

// 子应用路由组件
const SubAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectListPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/tasks" element={<TaskManagementPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

// 子应用菜单组件
const SubAppMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={['/']}
      items={[
        { key: '/', icon: <ProjectOutlined />, label: '项目列表', onClick: () => navigate('/') },
        { key: '/tasks', icon: <ToolOutlined />, label: '任务管理', onClick: () => navigate('/tasks') },
        { key: '/settings', icon: <SettingOutlined />, label: '设置', onClick: () => navigate('/settings') },
      ]}
    />
  );
};

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
