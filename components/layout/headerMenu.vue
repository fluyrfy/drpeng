<template>
  <div
    class="header-menu"
    :class="{'header-menu__active': isMenuActive}"
  >
    <section
      v-if="!isMenuActive"
      class="d-flex justify-space-between px-3 header-menu__default-group"
    >
      <div class="d-flex align-center header-menu__title">
        <img class="mr-3" src="~/assets/img/icon/web-logo.svg">
        <span class="mt-2">
          LEARNING MAP
        </span>
      </div>
      <img
        class="header-menu__more-btn pointer"
        src="~/assets/img/icon/menu-more.svg"
        @click="isMenuActive = true"
      >
    </section>
    <section v-else class="pt-7">
      <div class="d-flex justify-end">
        <div
          class="pr-4 d-flex align-center header-menu__close-btn"
          @click="isMenuActive = false"
        >
          <span class="mr-3">
            Close
          </span>
          <v-icon class="header-menu__close-icon">
            $close
          </v-icon>
        </div>
      </div>
      <div
        class="mt-10 d-flex flex-column align-center header-menu__options-group"
      >
        <p
          :class="{'option-active': subjectActive}"
          @click="onLinkClick(!subjectActive ? 'subject': '')"
        >
          SUBJECT MAP
        </p>
        <p
          :class="{'option-active': theoremActive}"
          @click="onLinkClick(!theoremActive ? 'theorem': '')"
        >
          THEOREM MAP
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMenuActive: false,
      subjectActive: false,
      theoremActive: false
    }
  },
  mounted () {
    if (this.$route.path.includes('subject-map')) {
      this.subjectActive = true
      this.theoremActive = false
    } else {
      this.theoremActive = true
      this.subjectActive = false
    }
  },
  methods: {
    onLinkClick (target) {
      if (target === 'subject') {
        this.$router.push({
          name: 'subject-map-subjectCategory',
          params: {
            subjectCategory: this.$route.query.subject ? this.$route.query.subject : '1'
          }
        })
      } else if (target === 'theorem') {
        this.$router.push({
          name: 'theorem',
          query: {
            subjectCategory: this.$route.params.subjectCategory
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #707070;
  color: #fff;
  z-index: 99999;
  transition: all .5s;
  overflow: hidden;

  &__active {
    height: 288px;
    transition: all .5s;
  }

  &__title {
    height: 100%;
    font-size: 20px;
  }

  &__more-btn {
    width: 40px;
  }

  &__default-group {
    height: 100%;
  }

  &__close-btn {
    font-size: 19px;
  }

  &__close-icon {
    color: white !important;
    &::v-deep .v-icon__svg {
      height: 40px;
      width: 40px;
    }
  }

  &__options-group {
    font-size: 30px;
    font-weight: 100;
  }
}

.option-active {
  font-weight: bold;
}
</style>
