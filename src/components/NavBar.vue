<template>
  <nav class="navbar navbar-light bg-white sticky-top shadow-sm">
    <div class="container position-relative">
      <router-link :to="{ name: 'Home' }"
                   class="navbar-brand mb-0 h1">
        VueFilms
      </router-link>
      <div class="navbar-search">
        <input type="text"
               aria-label="search"
               placeholder="Search..."
               class="form-control"
               v-model="search">
        <router-link class="btn"
                     :to="{ name: 'Search', query: { search } }">
          <i class="icon-search" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  }
}
</script>
