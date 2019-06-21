export default {
  addNumByasyncFun ({commit}, payload) {
    setTimeout(() => {
      commit('AddNumByasyncFun', payload.count)
    }, 1000)
  },
  changeStateProp ({commit}, payload) {
    commit('ChangeStateProp', payload.name)
  }
}
