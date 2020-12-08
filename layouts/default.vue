<template>
  <v-app>
    <div>
      <Loading
        :active.sync="isLoading"
      />
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    Loading
  },
  computed: {
    isLoading () {
      return this.$store.state.api.isLoading
    }
  }
}
</script>

<style>

</style>
