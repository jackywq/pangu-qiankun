import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Card, Button } from 'antd';

const ProjectListPage: React.FC = () => {
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

export default ProjectListPage;