import "../common";
import "./common.css";
import '@/util/flexible.js'
import App from "./App";
import { createApp } from "vue";
import * as echarts from "echarts";
const app = createApp(App);
app.provide("SHOW2D", true) // 隐藏2d页面，只显示纯3d模块
app.use(echarts).mount("#app");
