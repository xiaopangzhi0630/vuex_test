import types from '../appManage-types.js'
const state = {
    dialogUpdateStatusVisible:false,
    dialogFormVisible:false,
    lineData:{},
    dialogStatus:'',
    title:'',
    currentPage:1,
    pageSize:10,
    total:0
}
const getters={
    dialogUpdateStatusVisible:(state)=>{
        return state.dialogUpdateStatusVisible
    },
    lineData:(state)=>{
        return state.lineData
    },
    dialogFormVisible:(state)=>{
        return state.dialogFormVisible;
    },
    dialogStatus:(state)=>{
        return state.dialogStatus;
    },
    title:(state)=>{
        return state.title;
    },
    currentPage:(state)=>{
        return state.currentPage
    },
    pageSize:(state)=>{
        return state.pageSize
    },
    total:(state)=>{
        return state.total
    }

  
}
const actions={
}
const mutations={
    setDialogUpdateStatusVisible(state,data){
        state.dialogUpdateStatusVisible=data
    },
    setLineData(state,data){
        state.lineData=data;
    },
    setDialogFormVisible(state,data){
        state.dialogFormVisible=data;
    },
    setTitle(state,data){
        state.title=data;
    },
    setCurrentPage(state,data){
        state.currentPage=data;
    },
    setPageSize(state,data){
        state.pageSize=data;
    },
    setDialogStatus(state,data){
        state.dialogStatus=data;
    },
    setTotal(state,data){
        state.total=data;
    }

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
