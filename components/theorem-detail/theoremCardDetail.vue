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
        <div
          v-for="(item, index) in covertStepDelta"
          :key="index"
          class="theorem-card-detail__step"
          :class="{
            'theorem-card-detail__step--first': (index + 1) % 3 === 1,
            'theorem-card-detail__step--second': (index + 1) % 3 === 2,
            'theorem-card-detail__step--third': (index + 1) % 3 === 0
          }"
        >
          <div
            class="d-flex justify-center align-center theorem-card-detail__step-title"
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
            <div
              class="theorem-card-detail__step-wrap"
              v-html="item.htmlContent"
            />
          </div>
          <div
            v-if="item.import_function"
            class="theorem-card-detail__step-connect-line"
            @click="onConnectClick(item.import_function)"
          />
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
      stepActiveList: []
    }
  },
  computed: {
    covertStepDelta () {
      if (!this.stepList.length) {
        return []
      }

      const covertList = this.stepList.map((item) => {
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
    padding: 20px 0 19px 19px;
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
    width: 80%;
  }

  &__step-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 28px;
  }

  &__arrow-icon {
    width: 24px;
    height: 12px;
    position: absolute;
    top: 23.5px;
    right: 20px;
    margin-top: 0;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__step {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    color: #8e8e8e;
    font-size: 24px;
    font-weight: bold;
    line-height: 0.17;
    width: 100%;
    position: relative;

    &--first {
      background: #f6ebda;
    }

    &--second {
      background: #e3d2c6;
    }

    &--third {
      background: #e3c6c6;
    }
  }

  &__step-title {
    width: 100%;
    height: 59px;
  }

  &__step-content {
    background: white;
    padding: 10px 15px;
    overflow: scroll;
    display: none;

    &--active {
      display: block;
    }
  }

  &__step-wrap {
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
    top: 30px;
    left: -100px;
  }
}
</style>
