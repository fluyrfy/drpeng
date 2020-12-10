<template>
  <div class="theorem-detail">
    <loading :active.sync="isLoading" />
    <theorem-card-deatil
      :card-info="formulaDetail"
      :step-list="formulaStep"
    />
    <base-subject-button />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import baseSubjectButton from '~/components/base/baseSubjectButton.vue'
import theoremCardDetail from '~/components/theorem-detail/theoremCardDetail.vue'
export default {
  components: {
    'theorem-card-deatil': theoremCardDetail,
    'base-subject-button': baseSubjectButton
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
  padding-top: 2%;
  padding-bottom: 20px;
}
</style>
