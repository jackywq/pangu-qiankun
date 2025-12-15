import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  DesktopOutlined,
  FileTextOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
        }}
      >
        <img
          src="/assets/logo.png"
          alt="盘古软件 Logo"
          style={{ height: 32, marginBottom: "8px" }}
        />
        <div style={{ color: "#fff", fontSize: "14px", fontWeight: "bold" }}>
          盘古软件
        </div>
      </div>

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
    </Sider>
  );
};

export default SiderMenu;
