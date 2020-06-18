import types from '../mutation-types.js'
const state = {
    fullHeight: document.documentElement.clientHeight,
    fullscreenLoading:false,
    asideEl: '123',
    asideState: true,
    layoutEl: {},
    mainContainerEl: '',
    topEl: '',
    switchesEl: '',
    logoSymbolEl: '',
    logoTextEl: '',
    itemContentEl:'',
    asideElarr:{},
    maxState:false,
    theme:'theme3',
}
const getters = {
   
    fullHeight: function(state) {
        return state.fullHeight;
    },
    fullscreenLoading:function(state){
        return state.fullscreenLoading
    },
    asideEl: (state) => {
        return state.asideEl;
    },
    asideState: (satte) => {
        return satte.asideState;
    },
    layoutEl: (satte) => {
        return state.layoutEl;
    },
    mainContainerEl: (state) => {
        return state.mainContainerEl;
    },
    topEl: (state) => {
        return state.topEl;
    },
    switchesEl: (state) => {
        return state.switchesEl;
    },
    logoSymbolEl: (state) => {
        return state.logoSymbolEl
    },
    logoTextEl: (state) => {
        return state.logoTextEl
    },
    itemContentEl:(state)=>{
        return state.itemContentEl
    },
    asideElarr:(state)=>{
        return state.asideElarr;
    },
    maxState:(state)=>{
        return state.maxState;
    },
    theme:(state)=>{
        return state.theme;
    }
}
const actions = {
    getfullHeight({ commit, state }) {
        commit(types.GETFULLHEIGHT);
    },
    setfullscreenLoading({commit},data){
        commit(types.setfullscreenLoading,data)
    },
    getasideEl({ commit, state }) {
        commit(types.GETASIDEEL)
    },
    setasideState({ commit, state }) {
        commit(types.SETASIDESTATE)
    },
    getlayoutEl({ commit, state }) {
        commit(types.GETLAYOUTEL)
    },
    getmainContainerEl({ commit, state }) {
        commit(types.MAINCONTAINEREL)
    },
    gettopEl({ commit }) {
        commit(types.GETTOPEL)
    },
    getswitchesEl({ commit }) {
        commit(types.GETSWITCHESEL)
    },
    getItemContentEl({commit}){
        commit(types.GETITEMCONTENT)
    },
    getAsideElarr({commit}){
        commit(types.GETASIDEELARR)
    },
    scrollAble({ commit }) {
        commit(types.SCROLLABLE)
    },
    scrollDisable({ commit }) {
        commit(types.SCROLLDISABLE)
    },
    darkStyle({ commit }) {
        commit(types.DARKSTYLE)
    },
    whiteStyle({ commit }) {
        commit(types.WHITESTYLE)
    },

}
const mutations = {
    [types.GETFULLHEIGHT](state, data) {
        window.onresize = () => {
            //未进入全屏状态
            if(!state.maxState){
                return (() => {
                    state.fullHeight = document.documentElement.clientHeight;
                })()
            }
            //全屏状态
            else{
                return (() => {
                    state.fullHeight = document.documentElement.clientHeight+80;
                })()
            }
            
        }
    },
    [types.setfullscreenLoading](state,data){
        state.fullscreenLoading=data;
        console.log(data)
    },
    // 获取aside
    [types.GETASIDEEL](state, data) {
        state.asideEl = data;
        // console.log(data);
    },
    //菜单展开/收起状态
    [types.SETASIDESTATE](state, data) {
        state.asideState = data;
    },
    //获取左侧菜单一系列虚拟dom
    [types.GETLAYOUTEL](satte, data) {
        state.layoutEl = data;
    },
    //获取首页容器虚拟dom
    [types.MAINCONTAINEREL](satte, data) {
        state.mainContainerEl = data;
    },
    //获取top虚拟dom
    [types.GETTOPEL](state, data) {
        state.topEl = data;
    },
    [types.GETSWITCHESEL](state, data) {
        state.switchesEl = data;
    },
    [types.LOGOSYMBOLEL](state, data) {
        state.logoSymbolEl = data;
    },
    [types.LOGOTEXTEL](state, data) {
        state.logoTextEl = data;
    },
    [types.GETITEMCONTENT](state,data){
        state.itemContentEl=data;
    },
    [types.GETASIDEELARR](state,data){
        state.asideElarr=data;
    },
    //可滚动/不可滚动
    [types.SCROLLABLE](state) {
        state.mainContainerEl.style.padding = "80px 12px 0 262px";
        state.mainContainerEl.style.backgroundColor = "#f2f2f2";
        state.mainContainerEl.style.overflowX = "hidden";
        state.mainContainerEl.style.overflowY = "auto";
    },
    [types.SCROLLDISABLE](state) {
        state.mainContainerEl.style.padding = "80px 12px 0 262px";
        state.mainContainerEl.style.backgroundColor = "#f2f2f2";
        state.mainContainerEl.style.overflow = "hidden";
    },
    //浅色/深色背景切换
    [types.DARKSTYLE](state) {
        state.mainContainerEl.style.padding = "84px 16px 16px 266px";
        state.mainContainerEl.style.backgroundColor = "#000";
        state.mainContainerEl.style.overflowX = "hidden";
        state.mainContainerEl.style.overflowY = "auto";
    },
    [types.WHITESTYLE](state) {
        state.mainContainerEl.style.padding = "80px 12px 0 262px";
        state.mainContainerEl.style.backgroundColor = "#f2f2f2";
        state.mainContainerEl.style.overflow = "hidden";
    },
    //页面元素全屏显示
    [types.ELEMENTFULL](state,data){
        state.maxState=data;
        state.fullHeight = state.fullHeight+80;
        console.log(state.fullHeight);
    },
    [types.ELEMENTMIN](state,data){
        state.maxState=data;
        state.fullHeight = state.fullHeight-80;
        console.log(state.fullHeight);
    },
    [types.TABTHEME](state,data){
        state.theme=data;
    }
   

}
export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}
