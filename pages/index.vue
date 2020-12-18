<template>
  <div>
    <loading :active.sync="isLoading" />
    <base-search
      v-model="searchText"
      :options="subjectList"
      @mapClick="onMapClick"
    />
    <div class="map">
      <island
        v-if="subjectList.length > 0"
        :subjects="filterSubjectList"
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
    ...mapState('api', ['subjectList', 'isLoading']),
    filterSubjectList () {
      if (!this.searchText) {
        return this.subjectList
      }

      return this.subjectList.filter((item) => {
        return item.name.includes(this.searchText)
      })
    }
  },
  async mounted () {
    await this.getSubjectList()
    this.scrollToTarget()
  },
  methods: {
    ...mapActions('api', ['getSubjectList']),
    scrollToTarget () {
      const subjectId = this.$route.query.subject

      if (!subjectId) {
        return
      }

      const map = document.querySelector('.map')
      const target = document.getElementById(subjectId).style.left
      const pxIndex = target.indexOf('px')
      const targetPosition = target.slice(0, pxIndex)

      map.scrollLeft += targetPosition
    },
    onMapClick () {
      this.$router.push({
        name: 'theorem'
      })
    }
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
