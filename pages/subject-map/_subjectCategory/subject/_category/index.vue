<template>
  <div class="subject">
    <header-menu />
    <loading :active.sync="isLoading" />
    <section
      class="subject__title-section d-flex justify-center align-center"
    >
      <nuxt-link
        :to="{
          name: 'subject-map-subjectCategory',
          query: {
            subject: subjectId
          },
          params: {
            subjectCategory: $route.params.subjectCategory
          }
        }"
        class="subject__back-button"
      >
        <img src="~/assets/img/icon/back-icon.svg">
      </nuxt-link>
      <h2>
        {{ subjectNow.name }}
      </h2>
    </section>
    <chapter-list
      v-if="chapterList.length > 0"
      :chapter-list="handleChapterList"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import chapterList from '~/components/subject/chapterList'
import headerMenu from '~/components/layout/headerMenu'
export default {
  components: {
    'chapter-list': chapterList,
    'header-menu': headerMenu
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('api', ['chapterList', 'subjectNow', 'sectionList', 'isLoading']),
    subjectId () {
      if (!this.$route.params.category) {
        return ''
      }

      return parseInt(this.$route.params.category)
    },
    handleChapterList () {
      if (!this.chapterList.length || !this.sectionList.length) {
        return []
      }

      const chapterListAddSection = this.chapterList.map((item) => {
        const obj = Object.assign({}, item)
        obj.section = []

        return obj
      })

      const chapterListMap = new Map(chapterListAddSection.map((item) => {
        return [
          item.id,
          item.section
        ]
      }))

      this.sectionList.forEach((item) => {
        const chapter = chapterListMap.get(item.chapter)
        chapter.push(item)
      })

      return chapterListAddSection
    }
  },
  async mounted () {
    if (this.subjectId && this.$route.params.subjectCategory) {
      await this.getChapterList(this.subjectId)
    } else {
      this.$router.push({
        name: `${this.$route.name}`,
        params: {
          category: '1',
          subjectCategory: this.$route.params.subjectCategory ? this.$route.params.subjectCategory : '1'
        }
      })
    }
  },
  methods: {
    ...mapActions('api', ['getChapterList'])
  }
}
</script>

<style lang="scss" scoped>
.subject {
  background:#FCF7CE;
  min-height: 100vh;
  padding-bottom: 22px;

  &__title-section {
    padding-top: 90px;
    position: relative;

    h2 {
      color: #7c4c2f;
    }
  }

  &__back-button {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 90px;
    left: 6.4%;

    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
