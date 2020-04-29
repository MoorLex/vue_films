export default {
  namespaced: true,
  state: {
    list: [],
    page: 1
  },
  getters: {
    list (state) {
      return state.list
    },
    page (state) {
      return state.page
    }
  },
  mutations: {

    append (state, list) {
      state.list = [
        ...state.list,
        ...list
      ]
      state.page++
    }
  }
}
