const state = () => ({
  needReload: false
})

const mutations = {
  changeReload (state, payload) {
    state.needReload = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
