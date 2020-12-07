const state = () => ({
  subjectList: [],
  chapterList: [],
  sectionList: [],
  subjectNow: {},
  chapterNow: {},
  sectionNow: {}
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
  },
  async getSection ({ commit }, id) {
    const section = await this.$axios.$get(`${process.env.BASE_API_URL}section/${id}`)
    const chapter = await this.$axios.$get(`${process.env.BASE_API_URL}section/${section.chapter}`)

    commit('setSection', { section, chapter })
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
  },
  setSection (state, data) {
    state.sectionNow = data.section
    state.chapterNow = data.chapter
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
