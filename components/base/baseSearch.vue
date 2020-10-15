<template>
  <div class="base-search">
    <v-text-field
      v-model="searchText"
      append-icon="$close"
      outlined
      dense
      class="white"
      hide-details="auto"
      @click:append="clear"
    >
      <template slot="prepend-inner">
        <v-icon>$map</v-icon>
        <v-divider
          class="mx-2"
          vertical
        />
        <v-icon>$search</v-icon>
      </template>
    </v-text-field>
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
