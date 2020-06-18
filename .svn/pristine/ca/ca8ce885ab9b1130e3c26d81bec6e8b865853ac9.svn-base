const state = {
    dialogFormVisible:false,    
    dialogStatus:'',           //弹窗状态 edit |add
    title:'' ,                 //弹窗标题
    currentLineData:{},
    currentPage:1,
    pageSize:10,
    totals:0
}
const getters={
    dialogFormVisible:(state)=>{
        return state.dialogFormVisible
    },
    dialogStatus:(state)=>{
        return state.dialogStatus
    },
    title:(state)=>{
        return state.title
    },
    currentLineData:(state)=>{
        return state.currentLineData
    },
    currentPage:(state)=>{
        return state.currentPage
    },
    pageSize:(state)=>{
        return state.pageSize
    },
    totals:(state)=>{
        return state.totals
    }
}
const actions={
    turnDialogFormVisible({commit, state}){
        commit(turnDialogFormVisible)
    },
    setTotal({commit,state},data){
        commit(setTotal,data)
    }
}
const mutations={
    turnDialogFormVisible(state, data) {
        state.dialogFormVisible=data
    },
    turnDialogStatus(state,data){
        state.dialogStatus=data
    },
    setTitle(state,data){
        state.title=data;
    },
    setCurrentLineData(state,data){
        state.currentLineData=data;
    },
    setCurrentPage(state,data){
        state.currentPage=data
    },
    setPageSize(state,data){
        state.pageSize=data;
    },
    setTotal(state,data){
        state.totals=data
    }
}
export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}
