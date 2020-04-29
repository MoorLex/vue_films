<template>
  <div class="ratio r-21x9 rounded-sm-5 overflow-hidden bg-secondary"
       :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w92${film.backdrop_path})` }">
    <div class="position-absolute fill-parent bg-image"
         v-lazy:background-image="imgObj" />
    <div class="fill-parent d-flex flex-column">
      <div class="mt-auto px-3 px-md-4 pt-5 bg-linear">
        <router-link class="text-light"
                     :to="{ name: 'Film', params: { id: film.id } }">
          <h2 class="text-white title">{{ film.title }}</h2>
        </router-link>
        <div class="w-100"
             style="max-width: 700px">
          <p class="text-white slide-overview d-none d-md-block">{{ film.overview }}</p>
          <div class="mb-3 align-items-center d-none d-md-flex">
            <button class="btn text-light btn-sm btn-squire"
                    @click="slider.$swiper.slidePrev()">
              <i class="icon-chevron-left" />
            </button>
            <div class="d-flex">
              <div class="slider-dot"
                   :class="{ active: i === slide }"
                   @click="swiper.slideTo(i, 200)"
                   v-for="(item, i) in count"
                   :key="i" />
            </div>
            <button class="btn text-light btn-sm btn-squire"
                    @click="swiper.slideNext()">
              <i class="icon-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    film: Object,
    slider: Object,
    slide: Number,
    count: Number
  },
  data () {
    return {
      imgObj: {
        src: `https://image.tmdb.org/t/p/original${this.film.backdrop_path}`
      }
    }
  }
}
</script>
