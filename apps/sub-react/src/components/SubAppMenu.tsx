import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  ProjectOutlined,
  ToolOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const SubAppMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={[
        {
          key: "/",
          icon: <ProjectOutlined />,
          label: "项目列表",
          onClick: () => navigate("/"),
        },
        {
          key: "/tasks",
          icon: <ToolOutlined />,
          label: "任务管理",
          onClick: () => navigate("/tasks"),
        },
        {
          key: "/settings",
          icon: <SettingOutlined />,
          label: "设置",
          onClick: () => navigate("/settings"),
        },
      ]}
    />
  );
};

export default SubAppMenu;
