import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueMoment from 'vue-moment'
import moment from 'moment'
import VueLazyload from 'vue-lazyload'

import 'swiper/css/swiper.css'
import './styles/index.scss'

Vue.use(VueLazyload)
Vue.use(VueMoment, { moment })
Vue.component('Swiper', Swiper)
Vue.component('SwiperSlide', SwiperSlide)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
