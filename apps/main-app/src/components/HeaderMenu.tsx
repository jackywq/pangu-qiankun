import React from "react";
import { theme } from "antd";
import { Header } from "antd/es/layout/layout";

const HeaderMenu: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        paddingLeft: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>盘古软件 - 企业级项目管理系统</h2>
    </Header>
  );
};

export default HeaderMenu;
