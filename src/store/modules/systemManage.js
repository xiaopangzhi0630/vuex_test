const state = {
    dialogFormVisible: false,
    dialogUpdateStatusVisible: false,
    lineData: {},
    dialogStatus: '',
    title: '',
    currentPage: 1,
    pageSize: 10,
    total: 0
}
const getters = {
    lineData: (state) => {
        return state.lineData
    },
    dialogFormVisible: (state) => {
        return state.dialogFormVisible
    },
    dialogUpdateStatusVisible: (state) => {
        return state.dialogUpdateStatusVisible
    },
    dialogStatus: (state) => {
        return state.dialogStatus
    },
    title: (state) => {
        return state.title;
    },
    currentPage: (state) => {
        return state.currentPage
    },
    pageSize: (state) => {
        return state.pageSize
    },
    total: (state) => {
        return state.total
    },

}
const actions = {
}
const mutations = {
    setLineData(state, data) {
        state.lineData = data;
    },
    setDialogFormVisible(state, data) {
        state.dialogFormVisible = data;
    },
    setDialogUpdateStatusVisible(state, data) {
        state.dialogUpdateStatusVisible = data
    },
    setTitle(state, data) {
        state.title = data;
    },
    setCurrentPage(state, data) {
        state.currentPage = data;
    },
    setDialogStatus(state, data) {
        state.dialogStatus = data;
    },
    setPageSize: (state, data) => {
        return state.pageSize = data;
    },
    setTotal(state, data) {
        state.total = data;
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
