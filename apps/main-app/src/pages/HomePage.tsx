import React from "react";

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "24px", background: "#fff", borderRadius: "8px" }}>
      <h1>欢迎使用盘古软件</h1>
      <p>
        盘古软件是一款企业级项目管理系统，提供项目管理、任务跟踪、数据分析等功能。
      </p>
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            padding: "16px",
            border: "1px solid #e8e8e8",
            borderRadius: "8px",
          }}
        >
          <h3>项目管理</h3>
          <p>创建和管理企业项目，分配资源和任务</p>
        </div>
        <div
          style={{
            padding: "16px",
            border: "1px solid #e8e8e8",
            borderRadius: "8px",
          }}
        >
          <h3>任务跟踪</h3>
          <p>跟踪任务进度，管理团队工作</p>
        </div>
        <div
          style={{
            padding: "16px",
            border: "1px solid #e8e8e8",
            borderRadius: "8px",
          }}
        >
          <h3>数据分析</h3>
          <p>生成报表，分析项目数据</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
