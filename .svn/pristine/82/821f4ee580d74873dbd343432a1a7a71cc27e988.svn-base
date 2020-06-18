import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import getters from './getters'
import layout from './modules/layout.js'  //页面布局、动效
import appManage from './modules/appManage.js'  //应用管理
import resourManage from './modules/resourManage.js'  //应用管理
import systemManage from './modules/systemManage.js'  //系统管理
export default new Vuex.Store({
    getters,
    modules: {
        layout: layout,
        appManage:appManage,
        resourManage:resourManage,
        systemManage:systemManage
    }
})
