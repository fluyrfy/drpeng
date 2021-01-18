<template>
  <div class="subject-map">
    <base-search
      v-model="searchText"
      :options="subjectList"
      @mapClick="onMapClick"
      @optionClick="onOptionClick"
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
    ...mapState('cube', ['needReload']),
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
    if (this.needReload) {
      this.$router.go(0)
    }
    const subjectCategory = parseInt(this.$route.params.subjectCategory)

    if (subjectCategory) {
      await this.getSubjectList()
      this.scrollToTarget()
    } else {
      this.$router.push({
        name: 'subject-map-subjectCategory',
        params: {
          subjectCategory: '1'
        }
      })
    }
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
        name: 'theorem',
        query: {
          subjectCategory: this.$route.params.subjectCategory
        }
      })
    },
    onOptionClick (value) {
      const target = this.subjectList.find(item => item.name === value)
      const id = target.id

      this.$router.push({
        name: 'subject-map-subjectCategory-subject-category',
        params: {
          category: id,
          subjectCategory: this.$route.params.subjectCategory
        }
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
