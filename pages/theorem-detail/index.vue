<template>
  <div class="theorem-detail">
    <theorem-card-deatil />
    <base-subject-button />
  </div>
</template>

<script>
import baseSubjectButton from '~/components/base/baseSubjectButton.vue'
import theoremCardDetail from '~/components/theorem-detail/theoremCardDetail.vue'
export default {
  components: {
    'theorem-card-deatil': theoremCardDetail,
    'base-subject-button': baseSubjectButton
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
