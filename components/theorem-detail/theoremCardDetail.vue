<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="theorem-card-detail">
    <div class="theorem-card-detail__title-group d-flex align-center">
      <img src="~/assets/img/icon/pix.svg">
      <h2 class="theorem-card-detail__title">
        {{ cardInfo.name }}
      </h2>
    </div>
    <div class="theorem-card-detail__content">
      <div class="theorem-card-detail__formula">
        <span
          v-html="cardInfo.mathml"
        />
      </div>
      <div class="theorem-card-detail__step-section">
        <section
          v-for="(item, index) in covertStepDelta"
          :key="index"
          class="theorem-card-detail__step-group"
        >
          <div
            class="theorem-card-detail__step"
            :class="{
              'theorem-card-detail__step--first': (index + 1) % 4 === 1,
              'theorem-card-detail__step--second': (index + 1) % 4 === 2,
              'theorem-card-detail__step--third': (index + 1) % 4 === 3,
              'theorem-card-detail__step--fourth': (index + 1) % 4 === 0
            }"
          >
            <div
              class="d-flex align-center justify-space-between theorem-card-detail__step-title"
              @click="onStepTitleClick(item)"
            >
              {{ index + 1 > 9 ? `STEP ${index + 1}` : `STEP 0${index + 1}` }}
              <img
                src="~/assets/img/icon/arrow.svg"
                class="theorem-card-detail__arrow-icon"
                :class="{'theorem-card-detail__arrow-icon--active': stepActiveList.indexOf(item) > -1}"
              >
            </div>
            <div
              class="theorem-card-detail__step-content"
              :class="{'theorem-card-detail__step-content--active': stepActiveList.indexOf(item) > -1}"
            >
              <div class="theorem-card-detail__step-wrap">
                <span v-html="item.htmlContent" />
              </div>
            </div>
            <div
              v-if="item.import_function"
              class="theorem-card-detail__step-connect-line"
              @click="onConnectClick(item.import_function)"
            />
          </div>
          <div class="d-flex justify-end theorem-card-detail__step-hint-container">
            <div
              v-if="index !== covertStepDelta.length - 1 && covertStepDelta[index + 1].hintContent"
              class="theorem-card-detail__step-hint"
              @click="onHintClick(covertStepDelta[index + 1].hintContent)"
            />
          </div>
        </section>
      </div>
    </div>
    <!-- note popup -->
    <div
      v-if="isPopupShow"
      class="theorem-card-detail__note-mask"
    >
      <div class="d-flex flex-column theorem-card-detail__note">
        <p class="theorem-card-detail__note-title">
          NOTE
        </p>
        <div class="theorem-card-detail__note-content">
          <span v-html="hintContent" />
        </div>
        <div
          class="theorem-card-detail__note-close"
          @click="onNoteCLoseClick"
        >
          <v-icon class="theorem-card-detail__note-close-icon">
            $close
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardInfo: {
      type: Object,
      default: () => ({})
    },
    stepList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      stepActiveList: [],
      isPopupShow: false,
      hintContent: null
    }
  },
  computed: {
    covertStepDelta () {
      if (!this.stepList.length) {
        return []
      }

      const covertList = this.stepList.map((item, index) => {
        const obj = Object.assign({}, item)

        const ops = JSON.parse(obj.delta).ops

        const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter
        const converter = new QuillDeltaToHtmlConverter(ops)

        converter.renderCustomWith((op) => {
          if (op.insert.value) {
            const val = op.insert.value
            return `<span class="ql-mathjax" contenteditable="false">${this.tex2svg(val)}</span>`
          } else {
            return 'Unmanaged custom blot!'
          }
        })

        const html = converter.convert()

        /* eslint-disable-next-line */
        MathJax.Hub.Queue(['Typeset', MathJax.Hub])

        /* eslint-disable-next-line */
        MathJax.Hub.Config({
          'HTML-CSS': { linebreaks: { automatic: true } }
        })

        obj.htmlContent = html

        if (obj.hint_delta) {
          const ops = JSON.parse(obj.delta).ops

          const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter
          const converter = new QuillDeltaToHtmlConverter(ops)

          converter.renderCustomWith((op) => {
            if (op.insert.value) {
              const val = op.insert.value
              return `<span class="ql-mathjax" contenteditable="false">${this.tex2svg(val)}</span>`
            } else {
              return 'Unmanaged custom blot!'
            }
          })

          const html = converter.convert()

          /* eslint-disable-next-line */
          MathJax.Hub.Queue(['Typeset', MathJax.Hub])

          /* eslint-disable-next-line */
          MathJax.Hub.Config({
            'HTML-CSS': { linebreaks: { automatic: true } }
          })

          obj.hintContent = html
        }

        return obj
      })

      return covertList
    }
  },
  watch: {
    cardInfo: {
      handler () {
        this.$nextTick(() => {
          this.renderMathJax()
        })
      }
    },
    $route (to, from) {
      if (to.query.id !== parseInt(from.query.id)) {
        location.reload()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderMathJax()
    })
  },
  methods: {
    onStepTitleClick (item) {
      const index = this.stepActiveList.indexOf(item)
      if (index > -1) {
        this.stepActiveList.splice(index, 1)
      } else {
        this.stepActiveList.push(item)
      }
    },
    renderMathJax () {
      /* eslint-disable-next-line */
      MathJax.Hub.Config({
        'HTML-CSS': { linebreaks: { automatic: true } }
      })
      /* eslint-disable-next-line */
      MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    },
    tex2svg (mathml) {
      const MathJaxNode = document.createElement('DIV')
      MathJaxNode.style.visibility = 'hidden'
      MathJaxNode.innerHTML = mathml
      document.body.appendChild(MathJaxNode)
      /* eslint-disable-next-line */
      MathJax.Hub.Queue(['Typeset', MathJax.Hub])
      const svg = MathJaxNode.innerHTML
      document.body.removeChild(MathJaxNode)
      return svg
    },
    onConnectClick (id) {
      this.$router.push({
        name: 'theorem-detail',
        query: {
          id
        }
      })
    },
    onHintClick (hint) {
      const body = document.querySelector('body')
      body.style.overflow = 'hidden'
      this.isPopupShow = true
      this.hintContent = hint
      this.$nextTick(() => {
        this.renderMathJax()
      })
    },
    onNoteCLoseClick () {
      const body = document.querySelector('body')
      body.style.overflow = 'auto'
      this.isPopupShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.theorem-card-detail {
  width: 95%;
  margin-left: auto;
  margin-right: auto;

  &__title-group {
    background: #556978;
    padding: 13px 0 13px 20px;
    border-radius: 6px 6px 0 0;
    box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.7);
  }

  &__title {
    font-size: 30px;
    line-height: 1.23;
    font-weight: 500;
    font-style: italic;
    color: white;
    margin-left: 16px;
  }

  &__content {
    background: white;
    box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.7);
    padding: 25px;
    position: relative;
  }

  &__formula {
    width: 90%;
  }

  &__step-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 28px;
  }

  &__step-group {
    width: 100%;
  }

  &__arrow-icon {
    width: 19px;
    height: 9px;
    margin-top: 0;
    transform: rotate(180deg);

    &--active {
      transform: rotate(0deg);
    }
  }

  &__step {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    color: #8e8e8e;
    font-size: 18px;
    font-weight: bold;
    line-height: 0.17;
    width: 100%;
    position: relative;

    &--first {
      background: #efefef;
    }

    &--second {
      background: #e5e5e5;
    }

    &--third {
      background: #cecece;
      color: #fff;
    }

    &--fourth {
      background: #ababab;
      color: #fff;
    }
  }

  &__step-title {
    width: 100%;
    height: 36px;
    padding: 0 15px;
  }

  &__step-content {
    background: white;
    overflow: hidden;
    height: 0;
    color: #8e8e8e;

    &--active {
      padding: 10px 15px;
      overflow: scroll;
      height: auto;
    }
  }

  &__step-wrap {
    width: 90%;
    margin-top: 10px;

    &::v-deep {
      font-weight: normal;
      font-size: 18px;
      line-height: normal;
      color: black;
    }

    &::v-deep .ql-mathjax {
      display: block;
      margin: 16px 0;
    }
  }

  &__step-connect-line {
    width: 100px;
    height: 2px;
    background: #c7c7c7;
    position: absolute;
    top: 18px;
    left: -100px;
  }

  &__step-hint-container {
    height: 50px;
  }

  &__step-hint {
    width: 36px;
    height: 50px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('~assets/img/icon/theorem-hint.svg');
  }

  &__note-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.9);
    z-index: 9999999999999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__note {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    background: #fffef4;
    width: 83%;
    height: 60%;
    padding: 25px;
    position: relative;
  }

  &__note-title {
    font-size: 24px;
    color: #556978;
    font-weight: bold;
    padding-bottom: 8px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 102%;
      transform: translateX(-1%);
      height: 2px;
      background: #556978;
      @include lessThan($--breakpoints-xs) {
        width: 110%;
        transform: translateX(-5%);
      }
    }
  }

  &__note-content {
    width: 90%;
    flex-grow: 1;
    overflow-y: scroll;
  }

  &__note-close {
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

    &__note-close-icon {
      color: white !important;
    }
}
</style>
