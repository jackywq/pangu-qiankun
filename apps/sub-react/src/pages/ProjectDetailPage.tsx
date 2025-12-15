import React from "react";
import { Card, List, Avatar } from "antd";

const ProjectDetailPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>项目详情</h1>
      <Card title="企业官网重构" style={{ marginBottom: "16px" }}>
        <p>项目描述: 对企业官网进行全面重构，提升用户体验和响应式设计。</p>
        <p>负责人: 张三</p>
        <p>团队成员: 李四, 王五, 赵六</p>
      </Card>
      <h2>任务列表</h2>
      <List
        dataSource={[
          { id: 1, title: "首页设计", assignee: "李四", status: "已完成" },
          { id: 2, title: "产品列表开发", assignee: "王五", status: "进行中" },
          {
            id: 3,
            title: "后台管理系统集成",
            assignee: "赵六",
            status: "计划中",
          },
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

export default ProjectDetailPage;
