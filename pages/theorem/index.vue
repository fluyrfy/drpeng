<template>
  <div class="theorem">
    <base-search />
    <theorem-card />
  </div>
</template>

<script>
import baseSearch from '~/components/base/baseSearch.vue'
import theoremCard from '~/components/theorem/theoremCard.vue'
export default {
  components: {
    'base-search': baseSearch,
    'theorem-card': theoremCard
  }
}
</script>

<style lang="scss" scoped>
.theorem {
  min-height: 100vh;
  background-image: url('~assets/img/theorem/theorem-bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding-top: 100px;
}
</style>
