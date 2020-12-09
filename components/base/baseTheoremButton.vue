<template>
  <div
    class="base-theorem-button pointer"
    @click="onTheoremButtonClick"
  />
</template>

<script>
export default {
  methods: {
    onTheoremButtonClick () {
      this.$router.push('/theorem')
    }
  }
}
</script>

<style lang="scss">
.base-theorem-button {
  width: 70px;
  height: 70px;
  background-image: url('~assets/img/icon/theorem-map-icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
