<template>
  <div class="base-search">
    <v-text-field
      v-bind="$attrs"
      :value="value"
      append-icon="$close"
      outlined
      dense
      class="white base-search__text-field"
      hide-details="auto"
      @input="passToParent"
      @click:append="onClearClick"
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
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    passToParent (value) {
      this.$emit('input', value)
    },
    onClearClick () {
      this.$emit('input', '')
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
  z-index: 1000;

  &__text-field {
    color: $--color-primary !important;
    caret-color: $--color-primary !important;
  }
}
</style>
