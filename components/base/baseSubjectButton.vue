<template>
  <div
    class="base-subject-button pointer"
    @click="onSubjectButtonClick"
  />
</template>

<script>
export default {
  methods: {
    onSubjectButtonClick () {
      this.$router.push({
        name: 'subject-map-subjectCategory',
        params: {
          subjectCategory: this.$route.query.subject ? this.$route.query.subject : '1'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.base-subject-button {
  width: 70px;
  height: 70px;
  background-image: url('~assets/img/icon/subject-map-icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
