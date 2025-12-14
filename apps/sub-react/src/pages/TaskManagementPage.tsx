import React from 'react';
import { List, Avatar } from 'antd';

const TaskManagementPage: React.FC = () => {
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

export default TaskManagementPage;