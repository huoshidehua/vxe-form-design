import Vue from 'vue'
import App from './App.vue'
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
