// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
// import httpService from './service/http-service'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// vue.prototype.$axios = httpService
Vue.use(ElementUI);

//请求拦截
//除了登陆界面，访问都加请求头Authorization
axios.interceptors.request.use(config => {
  if ("prod-api/common/login" != config.url) {
    if (localStorage.getItem("token")) {
      //login里面存了setItem geiItem 取数据
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token")
      console.log(localStorage.getItem("token"))
      //让每个请求携带自定义token
    }
  }
  return config;
}, err => {
  return Promise.reject(err);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
