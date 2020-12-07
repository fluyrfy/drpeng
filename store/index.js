import Vuex from 'vuex'
import api from './api'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      api
    }
  })
}

export default {
  createStore
}
