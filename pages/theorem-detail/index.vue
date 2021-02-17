<template>
  <div class="theorem-detail">
    <header-menu />
    <loading :active.sync="isLoading" />
    <theorem-card-deatil
      :card-info="formulaDetail"
      :step-list="formulaStep"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import theoremCardDetail from '~/components/theorem-detail/theoremCardDetail.vue'
import headerMenu from '~/components/layout/headerMenu.vue'
export default {
  components: {
    'theorem-card-deatil': theoremCardDetail,
    'header-menu': headerMenu
  },
  computed: {
    ...mapState('api', ['formulaDetail', 'formulaStep', 'isLoading'])
  },
  middleware ({ route, redirect }) {
    if (!route.query.id) {
      return redirect('/theorem')
    }
  },
  async mounted () {
    await this.getFormulaDetail(this.$route.query.id)
  },
  methods: {
    ...mapActions('api', ['getFormulaDetail'])
  }
}
</script>

<style lang='scss' scoped>
.theorem-detail {
  min-height: 100vh;
  background-image: url('~assets/img/theorem/theorem-bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding-top: 80px;
  padding-bottom: 20px;
}
</style>
