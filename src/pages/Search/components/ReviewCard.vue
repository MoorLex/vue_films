<template>
  <div class="mb-3 bg-light rounded p-3">
    <h3 class="mb-2 title">{{ review.author }}</h3>
    <p class="mb-0">{{ review.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    review: Object
  }
}
</script>
