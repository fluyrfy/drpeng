<template>
  <div>
    <base-search />
    <div class="map">
      <island />
    </div>
  </div>
</template>

<script>
import island from '~/components/index/island.vue'
import baseSearch from '~/components/base/baseSearch.vue'

export default {
  components: {
    island,
    'base-search': baseSearch
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
}
</style>
