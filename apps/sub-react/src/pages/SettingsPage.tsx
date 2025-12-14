import React from 'react';
import { Card } from 'antd';

const SettingsPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>项目设置</h1>
      <Card title="项目配置">
        <p>这里可以配置项目的各种参数和设置</p>
      </Card>
    </div>
  );
};

export default SettingsPage;