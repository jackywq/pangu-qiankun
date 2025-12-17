<template>
  <div class="data-analysis-container">
    <!-- 1. 顶部操作/筛选栏 -->
    <a-card :bordered="false" class="mb-4">
      <a-flex justify="space-between" align="center">
        <h2 class="text-lg font-bold m-0">数据分析大盘</h2>
        <a-space>
          <a-radio-group v-model:value="timeRange" button-style="solid">
            <a-radio-button value="today">今日</a-radio-button>
            <a-radio-button value="week">本周</a-radio-button>
            <a-radio-button value="month">本月</a-radio-button>
          </a-radio-group>
          <a-range-picker v-if="timeRange === 'custom'" />
          <a-button type="primary" @click="handleRefresh">
            <template #icon><ReloadOutlined /></template>
            刷新数据
          </a-button>
        </a-space>
      </a-flex>
    </a-card>

    <!-- 2. 核心指标卡片 (Statistics) -->
    <a-row :gutter="16" class="mb-4">
      <a-col :span="6" v-for="item in statsData" :key="item.title">
        <a-card :bordered="false" hoverable>
          <a-statistic
            :title="item.title"
            :value="item.value"
            :precision="item.precision"
            :prefix="item.prefix"
            :value-style="{ color: item.color }"
          >
            <template #suffix>
              <span class="text-xs text-gray-400 ml-2">{{ item.suffix }}</span>
            </template>
          </a-statistic>
          <div class="mt-2 text-gray-500 text-sm">
            <span>较昨日 {{ item.trend }}%</span>
            <component
              :is="item.trend > 0 ? 'ArrowUpOutlined' : 'ArrowDownOutlined'"
              :class="item.trend > 0 ? 'text-red-500' : 'text-green-500'"
            />
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 3. 图表与详细数据区域 -->
    <a-row :gutter="16">
      <!-- 左侧：趋势图表 -->
      <a-col :span="16">
        <a-card title="流量趋势分析" :bordered="false" class="h-full">
          <div ref="chartRef" style="height: 350px; width: 100%"></div>
        </a-card>
      </a-col>

      <!-- 右侧：排行榜/表格 -->
      <a-col :span="8">
        <a-card title="项目活跃度排名" :bordered="false" class="h-full">
          <a-list item-layout="horizontal" :data-source="rankingList">
            <template #renderItem="{ item, index }">
              <a-list-item>
                <a-list-item-meta
                  :description="`活跃人数: ${item.activeUsers}`"
                >
                  <template #title>
                    <a href="#">{{ item.title }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar
                      :style="{
                        backgroundColor: index < 3 ? '#1890ff' : '#fde3cf',
                        color: index < 3 ? 'white' : '#f56a00',
                      }"
                    >
                      {{ index + 1 }}
                    </a-avatar>
                  </template>
                </a-list-item-meta>
                <div>
                  {{ item.growth }}% <ArrowUpOutlined class="text-red-500" />
                </div>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// import {
//   ReloadOutlined,
//   ArrowUpOutlined,
//   ArrowDownOutlined,
// } from "@ant-design/icons-vue";
// 引入 ECharts
import * as echarts from "echarts";

// --- 状态定义 ---
const timeRange = ref("week");
const chartRef = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

// 模拟指标数据
const statsData = [
  {
    title: "总访问量 (PV)",
    value: 12039,
    color: "#3f8600",
    trend: 12.5,
    suffix: "次",
    precision: 0,
  },
  {
    title: "项目总数",
    value: 88,
    color: "#cf1322",
    trend: -2.1,
    suffix: "个",
    precision: 0,
  },
  {
    title: "销售额",
    value: 98200,
    color: "#1890ff",
    trend: 5.4,
    prefix: "¥",
    precision: 2,
  },
  {
    title: "活跃用户",
    value: 890,
    color: "#722ed1",
    trend: 8.2,
    suffix: "人",
    precision: 0,
  },
];

// 模拟排行榜数据
const rankingList = [
  { title: "盘古ERP系统", activeUsers: 423, growth: 12 },
  { title: "CRM客户管理", activeUsers: 310, growth: 8 },
  { title: "HRM人事系统", activeUsers: 254, growth: 5 },
  { title: "财务报表中心", activeUsers: 120, growth: 2 },
  { title: "供应链SCM", activeUsers: 89, growth: 1 },
];

// --- 方法 ---
const initChart = () => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    const option = {
      tooltip: { trigger: "axis" },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "访问量",
          type: "line",
          smooth: true,
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          itemStyle: { color: "#1890ff" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(24,144,255,0.5)" },
              { offset: 1, color: "rgba(24,144,255,0.01)" },
            ]),
          },
        },
      ],
    };
    myChart.setOption(option);
  }
};

const handleRefresh = () => {
  // 模拟数据刷新逻辑
  console.log("Refreshing data...");
  myChart?.showLoading();
  setTimeout(() => {
    myChart?.hideLoading();
  }, 1000);
};

// 监听窗口大小变化，自适应图表
const handleResize = () => {
  myChart?.resize();
};

// --- 生命周期 ---
onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  myChart?.dispose();
});
</script>

<style scoped>
.data-analysis-container {
  padding: 24px;
  background-color: #f0f2f5; /* 浅灰色背景，突出卡片 */
  min-height: 100vh;
}
/* 辅助类，如果你没有用Tailwind，可以去掉 text-lg 等类名，写普通css */
.mb-4 {
  margin-bottom: 16px;
}
.text-lg {
  font-size: 18px;
}
.font-bold {
  font-weight: bold;
}
</style>