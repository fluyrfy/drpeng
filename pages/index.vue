<template>
  <div>
    <loading :active.sync="isLoading" />
    <base-search v-model="searchText" />
    <div class="map">
      <island
        v-if="subjectList.length > 0"
        :subjects="subjectList"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
  },
  computed: {
    ...mapState('api', ['subjectList', 'isLoading'])
  },
  async mounted () {
    await this.getSubjectList()
  },
  methods: {
    ...mapActions('api', ['getSubjectList'])
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  background-image: url('~assets/img/index/index-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
