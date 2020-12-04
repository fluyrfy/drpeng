<template>
  <div class="chapter-section">
    <section class="chapter-section__title-section">
      <p>
        SECTION 1.7
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
          Mathematical Models: A Catalog of Essential Functions
        </h3>
      </div>
    </section>
    <section class="chapter-section__section-content">
      <div class="chapter-section__section-content--content">
        <p>
          English is a West Germanic language that was first spoken in early medieval England and eventually became a global lingua franca.[4][5] It is named after the Angles, one of the ancient Germanic peoples that migrated to the area of Great Britain that later took their name, England. Both names derive from Anglia, a peninsula on the Baltic Sea. English is most closely related to Frisian and Low Saxon, while its vocabulary has been significantly influenced by other Germanic languages, particularly Old Norse (a North Germanic language), as well as Latin and French.
        </p>
        <p>
          English has developed over the course of more than 1,400 years. The earliest forms of English, a group of West Germanic (Ingvaeonic) dialects brought to Great and
        </p>
      </div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      backParams: null,
      isVideoActive: false
    }
  },
  mounted () {
    this.backParams = this.$route.params.category
  }
}
</script>

<style lang="scss" scoped>
.chapter-section {
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
}
</style>
