
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

let root: ReactDOM.Root | null = null;

function render(props: any) {
  const { container } = props;
  const dom = container ? container.querySelector('#root') : document.getElementById('root');
  root = ReactDOM.createRoot(dom as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react18] bootstraped');
}

export async function mount(props: any) {
  console.log('[react18] mount', props);
  render(props);
}

export async function unmount(props: any) {
  console.log('[react18] unmount', props);
  root?.unmount();
}
