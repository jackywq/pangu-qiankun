
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerMicroApps, start } from 'qiankun';
import './index.less';

// 注册子应用
registerMicroApps([
  {
    name: 'sub-react',
    entry: '//localhost:10000',
    container: '#subapp-viewport',
    activeRule: '/react',
  },
  {
    name: 'sub-vue',
    entry: '//localhost:20000',
    container: '#subapp-viewport',
    activeRule: '/vue',
  },
]);

// 启动 Qiankun
start({
  sandbox: { experimentalStyleIsolation: true } // 样式隔离
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
