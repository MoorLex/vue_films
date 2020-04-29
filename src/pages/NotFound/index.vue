<template>
  <div class="vh-100 d-flex align-items-center justify-content-center">
    <div class="status_code px-3 title text-dark font-weight-light">
      404
    </div>
    <div class="message px-3 text-muted">Страница не найдена</div>
    <div class="logo text-muted p-3">
      <span class="mr-1">@</span><span>moorlex</span>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    const { from } = this.$route.query
    if (from) {
      history.pushState({}, null, from + '')
    }
  }
}
</script>

<style scoped>
  .status_code {
    font-size: 30px;
    border-right: 2px solid;
  }
  .logo {
    left: 0;
    bottom: 0;
    font-size: 12px;
    position: absolute;
    font-family: 'Ubuntu', sans-serif;
  }
</style>
