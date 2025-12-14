
import { createApp } from 'vue';
import App from './App.vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

let app: any;

function render(props: any = {}) {
  const { container } = props;
  app = createApp(App);
  app.use(Antd);
  app.mount(container ? container.querySelector('#app') : '#app');
}

renderWithQiankun({
  mount(props) {
    console.log('vue3 mount');
    render(props);
  },
  bootstrap() {
    console.log('vue3 bootstrap');
  },
  unmount(props) {
    console.log('vue3 unmount');
    app.unmount();
  },
  update(props) {
    console.log('vue3 update');
  }
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
