<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="theorem-card"
    :style="
      `left: ${cardInfo.sort * 210}px;
      top: ${(cardInfo.randomTop + 1) * 50}px`
    "
    @click="onCardClick"
  >
    <div class="theorem-card__title-group d-flex justify-center align-center">
      <img
        src="~/assets/img/icon/pix.svg"
        class="theorem-card__title-icon"
      >
      <h2 class="theorem-card__title">
        {{ cardInfo.name }}
      </h2>
    </div>
    <div class="theorem-card__content">
      <div class="theorem-card__formula">
        <span
          :ref="`mathJaxEl${cardInfo.sort}`"
          v-html="cardInfo.mathml"
        />
      </div>
      <div class="theorem-card__step-section">
        <div
          v-for="num in cardInfo.function_proof_count"
          :key="num"
          class="theorem-card__step theorem-card__step--first"
          :class="{
            'theorem-card__step--first': num % 3 === 1,
            'theorem-card__step--second': num % 3 === 2,
            'theorem-card__step--third': num % 3 === 0
          }"
        >
          {{ num > 9 ? `STEP ${num}` : `STEP 0${num}` }}
          <img src="~/assets/img/icon/arrow.svg">
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
    }
  },
  mounted () {
    setTimeout(() => {
      this.renderMathJax()
    }, 500)
  },
  methods: {
    renderMathJax () {
      /* eslint-disable-next-line */
      MathJax.Hub.Config({
        'HTML-CSS': { linebreaks: { automatic: true } }
      })
      /* eslint-disable-next-line */
      MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    },
    onCardClick () {
      this.$router.push({
        name: 'theorem-detail',
        query: {
          id: this.cardInfo.id,
          subject: this.$route.query.subjectCategory
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.theorem-card {
  width: 200px;
  position: absolute;

  &__title-group {
    background: #556978;
    padding: 10px 9px 9px 9.5px;
    border-radius: 6px 6px 0 0;
    box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.7);
  }

  &__title-icon {
    width: 20px;
    height: 15px;
  }

  &__title {
    font-size: 15px;
    line-height: 1.2;
    font-weight: 500;
    font-style: italic;
    color: white;
    margin-left: 8px;
  }

  &__content {
    background: white;
    box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.7);
    padding: 15px 10px;
    position: relative;
    min-height: 250px;
    img {
      width: 80%;
      margin-top: 15px;
    }
  }

  &__formula {
    width: 80%;
    font-size: 12px;
  }

  &__step-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 13px;
  }

  &__step {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    color: #8e8e8e;
    font-size: 10px;
    font-weight: bold;
    line-height: 0.2;
    width: 100%;
    height: 30px;
    position: relative;

    img {
      width: 12px;
      height: 8px;
      position: absolute;
      top: 11px;
      right: 20px;
      margin-top: 0;
    }

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
}
</style>
