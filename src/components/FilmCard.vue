<template>
  <div class="film-card">
    <router-link :to="{ name: 'Film', params: { id: film.id } }">
      <div class="ratio r-10x16 rounded mb-2 bg-image"
           :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w92${film.poster_path})` }">
        <div class="position-absolute rounded fill-parent bg-image"
             v-lazy:background-image="imgObj" />
        <div class="position-absolute rounded fill-parent bg-light d-flex justify-content-center align-items-center"
             v-if="!film.poster_path">
          <i class="icon-film text-muted"
             style="font-size: 50px;" />
        </div>
      </div>
    </router-link>
    <router-link :class="light ? 'text-light' : 'text-dark'"
                 :to="{ name: 'Film', params: { id: film.id } }">
      <h3 class="mb-0 film-title title">{{ film.title }}</h3>
    </router-link>
    <small class="text-muted">
      {{ film.release_date | moment('Y') }}
      {{ film.genres && film.genres[0] ? ', ' + film.genres[0].name : '' }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    film: Object,
    light: Boolean
  },
  data () {
    return {
      imgObj: {
        src: `https://image.tmdb.org/t/p/w500${this.film.poster_path}`
      }
    }
  }
}
</script>
