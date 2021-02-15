<template>
  <div class="chapter-list">
    <section
      v-for="(item, index) in chapterList"
      :key="index"
      class="chapter-list__list-section"
    >
      <div
        class="d-flex chapter-list__list-group"
        @click="onChapterClick(item.id)"
      >
        <div class="chapter-list__list-group--list-chapter">
          <span v-if="index + 1 < 10">
            CH0{{ index + 1 }}
          </span>
          <span v-else>
            CH{{ index + 1 }}
          </span>
        </div>
        <div class="chapter-list__list-group--list-title d-flex align-center">
          <span>
            {{ item.name }}
          </span>
          <div
            v-if="activeChapter.indexOf(item.id) > -1"
            class="chapter-list__list-group--fold-button"
          />
          <div
            v-else
            class="chapter-list__list-group--unfold-button"
          />
        </div>
      </div>
      <div
        class="chapter-list__list-group--detail"
        :class="{'chapter-list__list-group--detail-active': activeChapter.indexOf(item.id) > -1}"
      >
        <ul>
          <li
            v-for="(section, sectionIdx) in item.section"
            :key="sectionIdx"
            @click="onSectionClick(section.id, `${index + 1}.${sectionIdx + 1}`)"
          >
            <img src="~/assets/img/icon/chapter-more-icon.svg">
            <span class="chapter-list__detail-num">
              {{ `${index + 1}.${sectionIdx + 1}` }}
            </span>
            <span>
              {{ section.name }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    chapterList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeChapter: []
    }
  },
  methods: {
    onChapterClick (id) {
      const index = this.activeChapter.indexOf(id)

      if (index > -1) {
        this.activeChapter.splice(index, 1)
      } else {
        this.activeChapter.push(id)
      }
    },
    onSectionClick (id, section) {
      this.$router.push({
        name: 'subject-map-subjectCategory-subject-category-section',
        query: {
          sectionId: id,
          section
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter-list {
  padding: 0 3.47%;
  margin-top: 36px;
  &__list-group {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    &--list-chapter {
      flex: 0 0 20.57%;
      background: #c7c7c7;
      color: white;
      padding: 17px 12px 15px 14px;
      display: flex;
      align-items: center;
      justify-content: center;

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
        line-height: 1.5;
        font-weight: bold;
        max-width: calc(100% - 50px);
      }
    }

    &--unfold-button {
      width: 50px;
      height: 50px;
      background-image: url('~assets/img/icon/unfold-icon.svg');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      margin-left: auto;
      cursor: pointer;
    }

    &--fold-button {
      width: 50px;
      height: 50px;
      background-image: url('~assets/img/icon/fold-icon.svg');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      margin-left: auto;
      cursor: pointer;
    }

    &--detail {
      color: #8e8e8e;
      line-height: 1.38;
      display: flex;
      margin-top: 6px;
      background: #fffef4;
      height: 0;
      overflow: hidden;

      img {
        height: 20px;
      }

      ul {
        padding-left: 0;
        width: 100%;
      }

      li {
        display: flex;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        padding: 15px 10px;
      }
    }

    &--detail-active {
      height: auto;
      margin-bottom: 14px;
    }
  }

  &__detail-num {
    margin: 0 13px;
  }
}
</style>
