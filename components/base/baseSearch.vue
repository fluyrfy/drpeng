<template>
  <div class="base-search">
    <v-icon>
      $map
    </v-icon>
    <v-text-field
      v-model="searchText"
      prepend-inner-icon="$search"
      append-icon="$close"
      outlined
      dense
      @click:append="clear"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    clear () {
      this.searchText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.base-search {
  width: 70vw;
  height: 45px;
  position: fixed;
  top: 30px;
  left: 15vw;
}
</style>
