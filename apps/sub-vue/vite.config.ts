import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  base: "/sub-vue/", // 配合开发和部署路径
  plugins: [
    vue(),
    qiankun("sub-vue", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 20000,
    cors: true,
    origin: "http://localhost:20000", // 关键: 解决资源加载 404
  },
});
