<template>
  <div class="d-flex align-items-center mb-3">
    <div class="mr-3"
         style="width: 40px;">
      <div class="ratio r-1x1 rounded"
           :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${cast.profile_path})` }">
        <div class="fill-parent d-flex align-items-center justify-content-center bg-light rounded"
             v-if="!cast.profile_path">
          <i class="icon-user lead" />
        </div>
      </div>
    </div>
    <span>{{ cast.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    cast: Object
  }
}
</script>
