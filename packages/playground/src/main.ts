import Vue from 'vue'
import App from './App.vue'
import { ForgeToasts } from "@3squared/forge-ui";
import "prismjs"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles.scss'

Vue.use(ForgeToasts)

new Vue({
  render: h => h(App)
}).$mount('#app');