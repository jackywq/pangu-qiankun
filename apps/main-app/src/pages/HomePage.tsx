"use client";

import React, { MouseEvent, useRef } from "react";
import {
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
  BarChart3,
  Users,
  Zap,
  Clock,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

// --- 简单的淡入组件 (替代原有的 FadeIn 依赖) ---
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset =
    direction === "up" ? 20 : direction === "down" ? -20 : 0;
  const xOffset = direction === "left" ? 20 : direction === "right" ? -20 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: directionOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- 3D 交互卡片容器 (核心物理引擎) ---
function Hero3DCard({ children }: { children: React.ReactNode }) {
  const initialRotateX = 4;
  const initialRotateY = -8;

  const rotateX = useMotionValue(initialRotateX);
  const rotateY = useMotionValue(initialRotateY);

  // 弹簧配置：刚度高一点，回弹快一点，更有质感
  const springConfig = { stiffness: 300, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // 限制旋转角度，防止翻转过度
    rotateX.set(initialRotateX + mouseY * -12);
    rotateY.set(initialRotateY + mouseX * 12);
  }

  function handleMouseLeave() {
    rotateX.set(initialRotateX);
    rotateY.set(initialRotateY);
  }

  return (
    <div className="perspective-[1200px] py-10 flex justify-center w-full transform-gpu">
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[700px] cursor-pointer"
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- 主页面组件 ---
export default function PanguWelcome() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-50 flex items-center justify-center font-sans">
      {/* 1. 背景装饰 (CSS3 动效) */}
      <div className="absolute inset-0 z-0">
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_60%,transparent_100%)]"></div>

        {/* 动态光斑 */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-24">
          {/* --- 左侧：文案区域 --- */}
          <div className="lg:w-1/2 text-left">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-sm font-semibold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                盘古软件 · 企业级项目管理系统 v2.0
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6 tracking-tight">
                让项目交付 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  更透明，更高效
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                无论是敏捷开发还是瀑布流管理，盘古软件助您轻松掌控全局。 集成
                <b className="text-slate-900">任务看板、资源调度、数据大屏</b>
                于一体， 让团队协作井井有条。
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <button className="group relative overflow-hidden bg-blue-600 text-white h-12 px-8 rounded-lg text-base font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="flex items-center gap-2">
                    立即创建项目 <ArrowRight size={18} />
                  </span>
                </button>
                <button className="h-12 px-8 rounded-lg text-slate-700 bg-white border border-slate-200 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  查看演示空间
                </button>
              </div>
            </FadeIn>

            {/* 底部数据统计 */}
            <FadeIn delay={0.5}>
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-2xl font-bold text-slate-900">99.9%</p>
                  <p className="text-sm text-slate-500">系统稳定性</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">30%+</p>
                  <p className="text-sm text-slate-500">效率提升</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">0 延期</p>
                  <p className="text-sm text-slate-500">智能预警</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* --- 右侧：3D 交互舞台 --- */}
          <div className="lg:w-1/2 w-full flex justify-center relative z-20">
            <FadeIn direction="right" delay={0.4} className="w-full">
              <Hero3DCard>
                {/* 
                                    === 核心面板 (Card Base) === 
                                    模拟“盘古软件”的仪表盘界面
                                */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-20px_rgba(22,119,255,0.15)] group">
                  {/* 顶部导航模拟 */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100/80">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <LayoutDashboard size={18} />
                      </div>
                      <span className="font-bold text-slate-700">
                        工作台 · 概览
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                  </div>

                  {/* 模拟图表区域 */}
                  <div className="space-y-4">
                    {/* 进度条区块 */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                        <span>当前冲刺 (Sprint 24)</span>
                        <span className="text-blue-600">75%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, delay: 0.8 }}
                          className="h-full bg-blue-500 rounded-full"
                        ></motion.div>
                      </div>
                    </div>

                    {/* 数据网格 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={16} className="text-blue-600" />
                          <span className="text-xs font-bold text-slate-500">
                            已完成任务
                          </span>
                        </div>
                        <div className="text-2xl font-black text-slate-800">
                          1,284
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={16} className="text-orange-500" />
                          <span className="text-xs font-bold text-slate-500">
                            待处理
                          </span>
                        </div>
                        <div className="text-2xl font-black text-slate-800">
                          12
                        </div>
                      </div>
                    </div>

                    {/* 模拟甘特图条 */}
                    <div className="flex gap-2 pt-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-16 flex-1 bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden"
                        >
                          <div
                            className={`absolute top-2 left-2 right-2 h-2 rounded-full ${
                              i === 1
                                ? "bg-green-200 w-2/3"
                                : i === 2
                                ? "bg-blue-200 w-1/2"
                                : "bg-purple-200 w-3/4"
                            }`}
                          ></div>
                          <div className="absolute top-6 left-2 right-8 h-1 bg-slate-200 rounded-full w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 
                                    === 悬浮元素 (Z轴分离) === 
                                    使用 transform: translateZ 让它们浮在卡片上方
                                */}

                {/* 右上角：数据分析浮窗 */}
                <motion.div
                  style={{ z: 50 }} // 在 Framer Motion 中模拟 z-index 排序
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-8 -top-8 bg-white shadow-xl p-3 rounded-2xl border border-slate-100 flex items-center gap-3 pr-6"
                >
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      ROI Analysis
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      数据分析报表
                    </div>
                  </div>
                </motion.div>

                {/* 左下角：团队协作浮窗 */}
                <motion.div
                  style={{ z: 40 }}
                  animate={{ y: [5, -5, 5] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -left-10 bottom-16 bg-white shadow-xl p-3 rounded-2xl border border-slate-100 flex items-center gap-3 pr-6"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      Team
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      团队实时协作
                    </div>
                  </div>
                </motion.div>

                {/* 右下角：效率提升徽章 */}
                <motion.div
                  style={{ z: 60 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-4 -bottom-6 bg-[#1677FF] text-white p-4 rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center gap-3"
                >
                  <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
                    <Zap fill="currentColor" size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-blue-100 opacity-90">
                      综合效能
                    </div>
                    <div className="text-lg font-bold leading-none mt-0.5">
                      +45%
                    </div>
                  </div>
                </motion.div>

                {/* 装饰：背景辉光 (在 3D 空间的最底层) */}
                <div
                  style={{ transform: "translateZ(-60px)" }}
                  className="absolute inset-0 bg-blue-400/20 blur-[80px] rounded-full pointer-events-none"
                ></div>
              </Hero3DCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
