<template>
  <div class="theorem">
    <loading :active.sync="isLoading" />
    <base-search />
    <div class="theorem-card-section">
      <div class="theorem-card-container">
        <theorem-card
          v-for="(item, index) in randomFormulaList"
          :key="index"
          :card-info="handleInfo(item, index)"
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
  computed: {
    ...mapState('api', ['randomFormulaList', 'isLoading'])
  },
  async mounted () {
    await this.getFormulaList()
  },
  methods: {
    ...mapActions('api', ['getFormulaList']),
    handleInfo (info, index) {
      const newInfo = Object.assign({}, info)

      newInfo.sort = index

      return newInfo
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
