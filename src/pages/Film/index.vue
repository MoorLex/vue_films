<template>
  <div class="">
    <NavBar />
    <FilmHeader :film="film" />
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-4 col-lg-3 d-none d-md-block">
            <div class="p-3 sticky-top"
                 style="margin-top: -150px; top: 54 px;">
              <div class="p-2 bg-white rounded">
                <div class="ratio r-10x16 rounded mb-2"
                     :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${film.poster_path})` }" />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-9">
            <h1 class="title">{{ film.title }}</h1>
            <p>{{ film.overview }}</p>

            <div class="mt-5"
                 v-if="director">
              <h2 class="title text-muted mb-4">Director</h2>
              <ProfileCard :cast="director" />
            </div>

            <div class="mt-5"
                 v-if="writer">
              <h2 class="title text-muted mb-4">Writer</h2>
              <ProfileCard :cast="writer" />
            </div>

            <div class="mt-5">
              <h2 class="title text-muted mb-4">Cast</h2>
              <ProfileCard v-for="(cast, i) in casts"
                           :key="i"
                           :cast="cast" />
            </div>

            <div class="mt-5"
                 v-if="reviews.length > 0">
              <h2 class="title text-muted mb-4">User Reviews</h2>
              <ReviewCard v-for="(review, i) in reviews"
                          :key="i"
                          :review="review" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { api } from '../../api'
import NavBar from '../../components/NavBar'
import ReviewCard from './components/ReviewCard'
import ProfileCard from './components/ProfileCard'
import FilmHeader from './components/FilmHeader'

export default {
  props: {
    id: [Number, String]
  },
  beforeRouteEnter: (to, from, next) => {
    api.getFilm(to.params.id)
      .then((data) => {
        next((vm) => vm.setData(data))
      })
      .catch(() => {
        next({ name: 'NotFound', query: { from: to.path } })
      })
  },
  data () {
    return {
      reviews: [],
      casts: [],
      film: {},
      director: undefined,
      writer: undefined
    }
  },
  mounted () {
    this.loadCredits()
    this.loadReviews()
  },
  methods: {
    async loadCredits () {
      const { cast, crew } = await api.getFilmCredits(this.id)
      this.casts = cast.slice(0, 7)
      this.director = crew.find((item) => item.job === 'Director')
      this.writer = crew.find((item) => item.job === 'Screenplay')
    },
    async loadReviews () {
      const { results } = await api.getFilmReviews(this.id)
      this.reviews = results
    },
    setData (data) {
      this.film = data
    }
  },
  components: {
    NavBar,
    FilmHeader,
    ReviewCard,
    ProfileCard
  }
}
</script>
