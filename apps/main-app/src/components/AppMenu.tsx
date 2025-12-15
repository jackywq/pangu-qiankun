import React from "react";
import { Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const AppMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  const getSelectedKeys = () => {
    if (location.pathname.startsWith("/react")) return ["/react"];
    if (location.pathname.startsWith("/vue")) return ["/vue"];
    return [location.pathname];
  };

  return (
    <Menu
      theme="dark"
      selectedKeys={getSelectedKeys()}
      mode="inline"
      onClick={handleMenuClick}
      items={[
        { key: "/", icon: <PieChartOutlined />, label: "首页" },
        { key: "/project", icon: <FileTextOutlined />, label: "项目管理" },
        { key: "/react", icon: <BarChartOutlined />, label: "项目与任务" },
        { key: "/vue", icon: <DesktopOutlined />, label: "数据分析" },
      ]}
    />
  );
};

export default AppMenu;
