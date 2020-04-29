import Vue from 'vue'
import Vuex from 'vuex'

import PopularList from './PopularList'
import UpcomingList from './UpcomingList'
import HeroList from './HeroList'
import storage from './storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HeroList,
    PopularList,
    UpcomingList,
    storage
  }
})

export default store
