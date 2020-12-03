<template>
  <div>
    <base-search v-model="searchText" />
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
  },
  data () {
    return {
      searchText: ''
    }
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
