import '../common'
import App from './App'

import Vue from 'vue'
import * as echarts from 'echarts'


Vue.prototype.$echarts = echarts
Vue.prototype.$bus = new Vue

new Vue({
    render(h) {
        return h(App)
    }
}).$mount('#app')