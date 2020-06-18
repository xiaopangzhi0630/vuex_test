import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index.js"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axiosConfig/axios-init'
import '../src/public/css/public.css'
import '../src/public/css/theme.css'
import '../src/public/icon/iconfont.js'
import '../src/public/animate/animate.css'
import i18n from '../src/public/i18n/i18n' 
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record=>record.meta.isLogin)){   //是否需要登录
    if(localStorage.getItem('token')){            //验证token
      next();
    }
    else{
      next('/login')
    }
  }
  else{
    next()
  }
});