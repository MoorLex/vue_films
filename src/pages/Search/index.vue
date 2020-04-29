<template>
  <div class="">
    <NavBar />
    <section class="py-5">
      <div class="container">
        <h2 class="title mb-4"
            v-if="films.length > 0">
          Search "{{ search }}"
        </h2>
        <h2 class="title mb-4"
            v-else>
          No results found for "{{ search }}"
        </h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
               v-for="film in films"
               :key="film.id">
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

export default {
  watch: {
    $route ($route) {
      const query = $route.query.search
      this.loadFilms(query)
    }
  },
  computed: {
    search () {
      return this.$route.query.search || ''
    }
  },
  data () {
    return {
      films: []
    }
  },
  mounted () {
    this.loadFilms(this.search)
  },
  methods: {
    async loadFilms (query) {
      const { results } = await api.searchFilms(query)
      this.films = results
    }
  },
  components: {
    NavBar,
    FilmCard
  }
}
</script>
