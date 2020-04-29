export default {
  namespaced: true,
  state: {
    list: [],
    slide: 0
  },
  getters: {
    list (state) {
      return state.list
    },
    slide (state) {
      return state.slide
    }
  },
  mutations: {

    setList (state, list) {
      state.list = list
    },

    setSlide (state, slide) {
      state.slide = slide
      console.log(state.slide)
    }
  }
}
