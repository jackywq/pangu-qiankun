
import React from 'react';
import { Button, Card } from 'antd';

function App() {
  return (
    <div className="App" style={{ padding: 20 }}>
      <Card title="React Sub App (Webpack)" bordered={false} style={{ width: 300 }}>
        <p>Technology: React 18 + Webpack 5</p>
        <p>Features: Ant Design</p>
        <Button type="primary">Antd Button</Button>
      </Card>
    </div>
  );
}

export default App;
