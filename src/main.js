import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'view-design/dist/styles/iview.css';

Vue.use(VueRouter)
const routes = [{
		path: '/',
		name: 'home',
		component: () => import('@/components/NewVxeFormDesign.vue')
	},
	{
		path: '/new',
		name: 'new',
		component: () => import('@/components/NewVxeFormDesign.vue')
	},
	{
		path: '/old',
		name: 'old',
		component: () => import('@/components/VxeFormDesign.vue')
	}
]
const router = new VueRouter({
	routes // (缩写) 相当于 routes: routes
})
Vue.config.productionTip = false


new Vue({
	router: router,
	render: h => h(App),
}).$mount('#app')
