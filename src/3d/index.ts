import { createApp } from 'vue'

// 引用2d模块的app.vue页面，以避免文件冲突或重复。
// 通过配置SHOW2D属性来控制显示的内容
// import App from '../2d/App.vue';
import App from './App.vue';

import axios from "axios"
const app = createApp(App)
app.provide("$axios", axios)
app.provide("SHOW2D", false) // 隐藏2d页面，只显示纯3d模块
app.mount('#app')

// import { createCanvas } from "../util/dom";
// const canvas: HTMLCanvasElement = createCanvas()