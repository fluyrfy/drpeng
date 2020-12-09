<template>
  <div class="chapter-section">
    <loading :active.sync="isLoading" />
    <section class="chapter-section__title-section">
      <p>
        SECTION {{ $route.query.section }}
      </p>
      <div class="chapter-section__title-group d-flex">
        <div class="chapter-section__title-group--back-button">
          <nuxt-link
            v-if="backParams"
            :to="{
              name: 'subject-category',
              params: {
                category: backParams
              }
            }"
          >
            <img src="~/assets/img/icon/back-icon-white.svg">
          </nuxt-link>
        </div>
        <h3>
          {{ sectionNow.name }}
        </h3>
      </div>
    </section>
    <section class="chapter-section__section-content">
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="chapter-section__section-content--content"
        v-html="sectionNow.content"
      />
    </section>
    <div
      class="chapter-section__video-tag"
      :class="{'chapter-section__video-tag__active': isVideoActive}"
      @click="isVideoActive = !isVideoActive"
    >
      <div class="chapter-section__video-tag--title">
        <img
          class="chapter-section__video-tag--arrow"
          src="~/assets/img/icon/left-arrow-icon.svg"
        >
        <span>VIDEO</span>
      </div>
      <div class="chapter-section__video-tag--content">
        <img src="~/assets/img/icon/youtube-icon.png">
        <img src="~/assets/img/icon/youku-icon.png">
      </div>
    </div>
    <img
      src="~/assets/img/icon/note-icon.svg"
      class="chapter-section__note"
      @click="isShowPopup = true"
    >
    <div
      class="chapter-section__note-popup"
      :class="{'chapter-section__note-popup--active': isShowPopup}"
    >
      <div class="chapter-section__popup-block">
        <p class="chapter-section__popup-block--hint">
          該處使用_______定理，您可以查看定理證明過程或選擇觀看定理地圖。
        </p>
        <button class="chapter-section__popup-block--button chapter-section__popup-block--button-more">
          <img src="~/assets/img/icon/map-icon.svg">
          <span>
            Read more
          </span>
        </button>
        <button class="chapter-section__popup-block--button chapter-section__popup-block--button-map">
          <img src="~/assets/img/icon/map-icon.svg">
          <span>
            Check map
          </span>
        </button>
        <div
          class="chapter-section__popup-block--close"
          @click="isShowPopup = false"
        >
          <v-icon class="chapter-section__popup-block--close-icon">
            $close
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      backParams: null,
      isVideoActive: false,
      isShowPopup: false
    }
  },
  computed: {
    ...mapState('api', ['sectionNow', 'isLoading'])
  },
  async mounted () {
    this.backParams = this.$route.params.category
    const id = this.$route.query.sectionId
    await this.getSection(id)
  },
  methods: {
    ...mapActions('api', ['getSection'])
  }
}
</script>

<style lang="scss" scoped>
.chapter-section {
  position: relative;
  &__title-section {
    background: #556978;
    color: white;
    padding: 15px 17px 15px 24px;

    p {
      color: #c7c7c7;
      text-align: right;
      line-height: 1.67;
      font-size: 12px;
      font-style: italic;
      margin-bottom: 0;
    }

    h3 {
      font-size: 18px;
      line-height: 1.11;
      font-weight: normal;
      text-align: right;
    }
  }

  &__title-group {
    &--back-button {
      flex: 0 0 20%;
    }

    h3 {
      flex: 0 0 80%;
    }
  }

  &__section-content {
    padding: 33px 30px 47px 30px;

    &--content {
      width: 90%;
      font-weight: 500;
      font-style: italic;
      line-height: 1.63;
      color: #747474;
    }
  }

  &__video-tag {
    width: 95px;
    height: 110px;
    background: #74a6a5;
    position: fixed;
    bottom: 59px;
    right: 0;
    color: white;
    display: flex;
    align-items: center;
    border-radius: 8px 0 0 8px;
    transition: all .5s;
    transform: translateX(55px);

    &--arrow {
      transform: rotate(90deg);
    }

    &--title {
      transform: rotate(-90deg);
      font-weight: 500;
      line-height: 1.63;
      font-style: italic;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 45%;
    }

    &--content {
      background: white;
      height: 100%;
      width: 55%;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;

      &::after {
        content: '';
        width: 80%;
        height: 1px;
        background: #8e8e8e;
        position: absolute;
        top: 42%;
        left: 5px;
      }

      img {
        width: 100%;

        &:last-child {
          margin-top: 8px;
        }
      }
    }

    &__active {
      transform: translateX(0);
      transition: all .5s;
    }
  }

  &__note {
    position: absolute;
    top: 240px;
    right: 5%;
  }

  &__note-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: black, $alpha: 0.6);
    justify-content: center;
    align-items: center;
    display: none;

    &--active {
      display: flex;
    }
  }

  &__popup-block {
    height: 300px;
    width: 66.67%;
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    padding: 40px 29px 22px 30px;
    position: relative;

    &--hint {
      font-size: 18px;
      color: #8e8e8e;
      line-height: 1.33;
      font-weight: bold;
      margin-bottom: 30px;
    }

    &--button {
      display: inline-flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.33;
      padding: 13px 0;
      border-radius: 4px;

      img {
        margin-right: 17px;
      }
    }

    &--button-more {
      background: #f99130;
    }

    &--button-map {
      background: #556978;
      margin-top: 7px;
    }

    &--close {
      border-radius: 50%;
      background: #8e8e8e;
      color: white;
      width: 30px;
      height: 30px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: -15px;
      right: -15px;
    }

    &--close-icon {
      color: white !important;
    }
  }
}
</style>
