<template>
  <div class="theorem">
    <loading :active.sync="isLoading" />
    <base-search
      :options="allFormulaList"
      :no-input="true"
      @input="onSearchInput"
      @mapClick="onMapClick"
    />
    <div class="theorem-card-section">
      <div class="theorem-card-container">
        <theorem-card
          v-for="(item, index) in handleRandomFormulaList"
          :key="index"
          :card-info="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import baseSearch from '~/components/base/baseSearch.vue'
import theoremCard from '~/components/theorem/theoremCard.vue'
export default {
  components: {
    'base-search': baseSearch,
    'theorem-card': theoremCard
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapState('api', ['randomFormulaList', 'allFormulaList', 'isLoading']),
    handleRandomFormulaList () {
      if (!this.randomFormulaList.length) {
        return []
      }

      const list = this.randomFormulaList.map((item, index) => {
        const obj = Object.assign({}, item)

        obj.sort = index
        obj.randomTop = Math.floor(Math.random() * 6)

        return obj
      })

      return list
    },
    handleRandomFormulaListMap () {
      if (!this.handleRandomFormulaList.length) {
        return new Map([])
      }

      return new Map(this.handleRandomFormulaList.map((item) => {
        return [
          item.name,
          item.id
        ]
      }))
    }
  },
  async mounted () {
    await this.getFormulaList()
  },
  methods: {
    ...mapActions('api', ['getFormulaList']),
    onSearchInput (value) {
      const detailId = this.handleRandomFormulaListMap.get(value)

      if (detailId) {
        this.$router.push({
          name: 'theorem-detail',
          query: {
            id: detailId
          }
        })
      }
    },
    onMapClick () {
      this.$router.push({
        name: 'subject-map-subjectCategory',
        params: {
          subjectCategory: this.$route.query.subjectCategory ? this.$route.query.subjectCategory : '1'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.theorem-card-section {
  background-image: url('~assets/img/theorem/theorem-bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: scroll;
}

.theorem-card-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
