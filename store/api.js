const state = () => ({
  subjectList: []
})

const actions = {
  async getSubjectList ({ commit }) {
    const result = await this.$axios.$get(process.env.BASE_API_URL + 'subject/?status=true&ordering=-order')

    const list = [...result]

    const sortList = list.sort((prev, next) => prev.id - next.id)

    commit('setSubjectList', sortList)
  }
}

const mutations = {
  setSubjectList (state, data) {
    state.subjectList = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
