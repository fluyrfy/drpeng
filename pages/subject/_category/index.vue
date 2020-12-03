<template>
  <div class="subject">
    <section
      class="subject__title-section d-flex justify-center align-center"
    >
      <nuxt-link
        :to="{
          name: 'index',
          query: {
            subject: 456
          }
        }"
        class="subject__back-button"
      >
        <img src="~/assets/img/icon/back-icon.svg">
      </nuxt-link>
      <h2>
        Calculus
      </h2>
    </section>
    <section class="subject__list-section">
      <div class="d-flex subject__list-group">
        <div class="subject__list-group--list-chapter">
          <span>
            CH01
          </span>
        </div>
        <div class="subject__list-group--list-title d-flex align-center">
          <span>
            Functions and Limits
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.subject {
  background: #f6ebda;
  min-height: 100vh;

  &__title-section {
    padding-top: 29px;
    position: relative;

    h2 {
      color: #7c4c2f;
    }
  }

  &__back-button {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 32px;
    left: 6.4%;

    img {
      height: 100%;
      width: 100%;
    }
  }

  &__list-section {
    padding: 0 3.47%;
    margin-top: 36px;
  }

  &__list-group {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    &--list-chapter {
      flex: 0 0 20.57%;
      text-align: center;
      background: #c7c7c7;
      color: white;
      padding: 17px 12px 15px 14px;

      span {
        font-weight: bold;
        font-size: 18px;
        line-height: 1.06;
      }
    }

    &--list-title {
      flex: auto;
      padding-left: 14px;
      background: #fffef4;

      span {
        font-size: 20px;
        color: #747474;
        line-height: 0.95;
        font-weight: bold;
      }
    }
  }
}
</style>
