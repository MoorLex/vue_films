<template>
  <section class="pt-sm-5">
    <div class="container p-0 px-md-3">
      <div class="ratio r-21x9 rounded-sm-5 mb-2 overflow-hidden bg-light"
           :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w92${film.backdrop_path})` }">
        <div class="position-absolute fill-parent bg-image"
             v-if="imgObj"
             v-lazy:background-image="imgObj" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    film: Object
  },
  data () {
    return {
      imgObj: undefined
    }
  },
  watch: {
    film (film) {
      if (film.backdrop_path) {
        this.imgObj = {
          src: `https://image.tmdb.org/t/p/original${film.backdrop_path}`
        }
      }
    }
  }
}
</script>
