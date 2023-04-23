// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
import API from '@/api/index.js'
Vue.prototype.$API = API
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
注册API全局组件

import App from './App.vue'

export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif