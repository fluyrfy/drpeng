<template>
  <div class="base-search">
    <v-text-field
      ref="searchInput"
      v-bind="$attrs"
      :value="value"
      append-icon="$close"
      outlined
      dense
      class="white base-search__text-field"
      hide-details="auto"
      @input="passToParent"
      @click.stop="onClick"
      @click:append="onClearClick"
    >
      <template slot="prepend-inner">
        <img
          class="base-search__map-icon"
          src="~/assets/img/icon/search-map-icon.svg"
          @click="onMapClick"
        >
        <v-divider
          class="mx-2"
          vertical
        />
        <v-icon>$search</v-icon>
      </template>
    </v-text-field>
    <div
      v-if="needToShow"
      class="base-search__auto-complete"
    >
      <p
        v-for="(item, index) in filterOptions"
        :key="index"
        @click="passToParent(item.name, 'click')"
      >
        {{ item.name }}
      </p>
      <span v-if="!filterOptions.length">
        no result
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    noInput: { // 控制 baseSearch 是否提供輸入功能，若為 true 就不會提供輸入功能，僅提供選項
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      needToShow: false,
      keyword: null
    }
  },
  computed: {
    filterOptions () {
      if (!this.keyword) {
        return this.options
      }

      return this.options.filter((item) => {
        return item.name.includes(this.keyword)
      })
    }
  },
  mounted () {
    document.addEventListener('click', this.hideAutoComplete)
  },
  destroyed () {
    document.removeEventListener('click', this.hideAutoComplete)
  },
  methods: {
    passToParent (value, click) {
      this.keyword = value
      this.needToShow = true

      if (this.noInput && click) {
        this.$emit('input', value)
      } else if (!this.noInput && click) {
        this.$emit('optionClick', value)
      } else if (this.noInput && !click && !value) {
        this.$emit('input', value)
      } else if (!this.noInput && !click) {
        this.$emit('input', value)
      }
    },
    onClearClick () {
      this.needToShow = false
      this.keyword = null
      this.$emit('input', '')

      if (this.noInput) {
        this.$refs.searchInput.lazyValue = ''
      }
    },
    hideAutoComplete () {
      this.needToShow = false
    },
    onClick () {
      if (!this.noInput) {
        return
      }

      this.needToShow = true
    },
    onBlur () {
      if (!this.noInput) {
        return
      }

      this.needToShow = false
    },
    onMapClick () {
      this.$emit('mapClick')
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

  &__auto-complete {
    position: absolute;
    width: 100%;
    background: white;
    text-align: center;
    padding: 8px;

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__map-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
