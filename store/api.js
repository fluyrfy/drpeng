const state = () => ({
  subjectList: [],
  chapterList: [],
  sectionList: [],
  randomFormulaList: [],
  subjectNow: {},
  sectionNow: {},
  isLoading: false
})

const actions = {
  async getSubjectList ({ commit }) {
    commit('changeLoadingStatus', true)
    const result = await this.$axios.$get(`${process.env.BASE_API_URL}subject/?status=true&ordering=-order`)

    commit('setSubjectList', result)
    commit('changeLoadingStatus', false)
  },
  async getChapterList ({ commit }, id) {
    if (!id) {
      return
    }
    commit('changeLoadingStatus', true)
    const [result, subject, sectionList] = await Promise.all([
      this.$axios.$get(`${process.env.BASE_API_URL}chapter/?status=true&ordering=-order&subject=${id}`),
      this.$axios.$get(`${process.env.BASE_API_URL}subject/${id}`),
      this.$axios.$get(`${process.env.BASE_API_URL}section/?status=true&ordering=-order&chapter__subject=${id}`)
    ])

    commit('setChapterList', { result, subject, sectionList })
    commit('changeLoadingStatus', false)
  },
  async getSection ({ commit }, id) {
    if (!id) {
      return
    }
    commit('changeLoadingStatus', true)
    const section = await this.$axios.$get(`${process.env.BASE_API_URL}section/${id}`)

    commit('setSection', section)
    commit('changeLoadingStatus', false)
  },
  async getFormulaList ({ commit }) {
    commit('changeLoadingStatus', true)
    const result = await this.$axios.$get(`${process.env.BASE_API_URL}function/?status=true&ordering=-order`)

    commit('setRandomFormulaList', result)
    commit('changeLoadingStatus', false)
  }
}

const mutations = {
  changeLoadingStatus (state, status) {
    state.isLoading = status
  },
  setSubjectList (state, data) {
    state.subjectList = data
  },
  setChapterList (state, data) {
    state.chapterList = data.result
    state.subjectNow = data.subject
    state.sectionList = data.sectionList
  },
  setSection (state, section) {
    state.sectionNow = section
  },
  setRandomFormulaList (state, data) {
    state.randomFormulaList = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
