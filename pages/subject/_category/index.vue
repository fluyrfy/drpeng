<template>
  <div class="subject">
    <section
      class="subject__title-section d-flex justify-center align-center"
    >
      <nuxt-link
        :to="{
          name: 'index',
          query: {
            subject: subjectId
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
    <base-theorem-button />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import chapterList from '~/components/subject/chapterList'
import baseTheoremButton from '~/components/base/baseTheoremButton'
export default {
  components: {
    'chapter-list': chapterList,
    'base-theorem-button': baseTheoremButton
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('api', ['chapterList', 'subjectNow', 'sectionList']),
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
  created () {
    this.getChapterList(this.subjectId)
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
