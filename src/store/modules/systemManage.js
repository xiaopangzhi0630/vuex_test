const state = {
  example: '',
  dialogVisible: false,  // 是否现实弹出框
  editChangeInfo: {},
  // formInfo: {}  
  btnType: '',  //按钮类型
  statusDialogVisible: false,
}

const getters = {
  example: (state) => {
    return state.example
  },
  dialogVisible: (state) => {
    return state.dialogVisible
  },
  editChangeInfo: (state) => {
    return state.editChangeInfo
  },
  btnType: (state) => {
    return state.btnType
  },
  statusDialogVisible: (state) => {
    return state.statusDialogVisible
  }


}

const actions = {
}

const mutations = {
  setExample(state, data) {
    state.example = data
  },
  setDialogVisible(state, data) {
    // console.log('是否显示',data)  
    state.dialogVisible = data
  },
  setEditChangeInfo(state, data) {
    console.log(data);
    state.editChangeInfo = data

  },
  setFormInfo(state, data) {
    state.editChangeInfo = data
  },

  setOrgType(state, data) {
    console.log('data', data);

    state.btnType = data
  },

  setStatusDialogVisible(state, data) {
    console.log(data);
    
    state.statusDialogVisible = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
