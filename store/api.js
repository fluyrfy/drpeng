const state = () => ({
  subjectList: [],
  chapterList: [],
  sectionList: [],
  subjectNow: {}
})

const actions = {
  async getSubjectList ({ commit }) {
    const result = await this.$axios.$get(`${process.env.BASE_API_URL}subject/?status=true&ordering=-order`)

    commit('setSubjectList', result)
  },
  async getChapterList ({ commit }, id) {
    const [result, subject, sectionList] = await Promise.all([
      this.$axios.$get(`${process.env.BASE_API_URL}chapter/?status=true&ordering=-order&subject=${id}`),
      this.$axios.$get(`${process.env.BASE_API_URL}subject/${id}`),
      this.$axios.$get(`${process.env.BASE_API_URL}section/?status=true&ordering=-order&chapter__subject=${id}`)
    ])

    commit('setChapterList', { result, subject, sectionList })
  }
}

const mutations = {
  setSubjectList (state, data) {
    state.subjectList = data
  },
  setChapterList (state, data) {
    state.chapterList = data.result
    state.subjectNow = data.subject
    state.sectionList = data.sectionList
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
