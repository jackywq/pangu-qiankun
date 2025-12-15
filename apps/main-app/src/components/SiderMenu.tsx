import React, { useState } from "react";
import { Layout } from "antd";
import AppMenu from "./AppMenu";

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
      <AppMenu />
    </Sider>
  );
};

export default SiderMenu;
