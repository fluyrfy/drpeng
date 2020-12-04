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
    <chapter-list />
  </div>
</template>

<script>
import chapterList from '~/components/subject/chapterList'
export default {
  components: {
    'chapter-list': chapterList
  },
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
  background:#FCF7CE;
  min-height: 100vh;
  padding-bottom: 22px;

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
}
</style>
