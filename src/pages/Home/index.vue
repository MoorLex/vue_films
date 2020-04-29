<template>
  <div class="">
    <NavBar />
    <section class="py-sm-5 hero">
      <Swiper :options="{ slidesPerView: 1, initialSlide: heroSlide }"
              @slideChange="$store.commit('HeroList/setSlide', $refs.heroSlider.$swiper.activeIndex)"
              ref="heroSlider">
        <SwiperSlide v-if="heroList.length === 0">
          <div class="container px-0 px-sm-3">
            <div class="ratio r-21x9 rounded-5 bg-light" />
          </div>
        </SwiperSlide>
        <SwiperSlide v-for="(film, slide) in heroList"
                     :key="slide">
          <div class="container px-0 px-sm-3">
            <HeroSlide :film="film"
                       :slide="slide"
                       :slider="$refs.heroSlider"
                       :count="heroList.length" />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="py-5 bg-dark">
      <div class="container">
        <h2 class="title mb-3 text-light">Coming Soon</h2>
      </div>
      <Swiper class="w-100 upcoming-slider"
              ref="upcomingSlider"
              :options="{ slidesPerView: 'auto', initialSlide: upcomingSlide }"
              @slideChange="$store.commit('UpcomingList/setSlide', $refs.upcomingSlider.$swiper.activeIndex)">
        <SwiperSlide v-for="i in 6"
                     :key="i"
                     v-show="upcomingList.length === 0">
          <div class="film-card px-3">
            <div class="ratio r-10x16 rounded mb-2 bg-secondary" />
            <div class="bg-secondary d-block w-75"
                 style="height: 20px;" />
            <div class="bg-secondary d-block w-75"
                 style="height: 20px;" />
            <div class="bg-secondary d-block w-25 mt-2"
                 style="height: 15px;" />
          </div>
        </SwiperSlide>
        <SwiperSlide v-for="film in upcomingList"
                     :key="film.id">
          <FilmCard class="px-3"
                    light
                    :film="film" />
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="py-5">
      <div class="container">
        <h2 class="title mb-3">Popular Films</h2>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
               v-for="(film, i) in films"
               :key="i">
            <FilmCard :film="film" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { api } from '../../api'
import NavBar from '../../components/NavBar'
import FilmCard from '../../components/FilmCard'
import HeroSlide from './comonents/HeroSlide'
import InfinityScroll from '../../utils/InfinityScroll'

let scroll

export default {
  data () {
    return {
      genres: []
    }
  },
  computed: {
    upcomingList () {
      return this.$store.getters['UpcomingList/list']
    },
    upcomingSlide () {
      return this.$store.getters['UpcomingList/slide']
    },
    heroList () {
      return this.$store.getters['HeroList/list']
    },
    heroSlide () {
      return this.$store.getters['HeroList/slide']
    },
    films () {
      return this.$store.getters['PopularList/list']
    },
    page () {
      return this.$store.getters['PopularList/page']
    }
  },
  mounted () {
    this.load()
    if (this.films.length < 10) {
      this.loadPopular()
    }
    this.$nextTick(() => {
      scroll = InfinityScroll(async () => {
        if (!this.loading) { await this.loadPopular() }
      }, 1000)
    })
  },
  beforeDestroy () {
    scroll()
  },
  methods: {
    async load () {
      const { genres } = await api.getGenres()
      this.genres = genres
      this.loadTrending().then(() => {})
      this.loadUpcoming().then(() => {})
    },
    async loadUpcoming () {
      if (this.upcomingList.length > 1) {
        return
      }
      const { results } = await api.getUpcoming()
      const list = results
      list.forEach((item) => {
        item.genres = item.genre_ids.reduce((arr, id) => [
          ...arr,
          this.genres.find((genre) => genre.id === id)
        ], [])
      })
      this.$store.commit('UpcomingList/setList', list)
    },
    async loadTrending () {
      if (this.heroList.length > 1) {
        return
      }
      const { results } = await api.getTrending('movie')
      const list = results.slice(0, 10)
      list.forEach((item) => {
        item.genres = item.genre_ids.reduce((arr, id) => [
          ...arr,
          this.genres.find((genre) => genre.id === id)
        ], [])
      })
      this.$store.commit('HeroList/setList', list)
    },
    async loadPopular () {
      const { results } = await api.getPopular(this.page)
      const list = results
      list.forEach((item) => {
        item.genres = item.genre_ids.reduce((arr, id) => [
          ...arr,
          this.genres.find((genre) => genre.id === id)
        ], [])
      })
      this.$store.commit('PopularList/append', list)
    }
  },
  components: {
    NavBar,
    HeroSlide,
    FilmCard
  }
}
</script>
