<template>
  <div class="theorem-card-detail">
    <div class="theorem-card-detail__title-group d-flex align-center">
      <img src="~/assets/img/icon/pix.svg">
      <h2 class="theorem-card-detail__title">
        PROOF OF LAW 04
      </h2>
    </div>
    <div class="theorem-card-detail__content">
      <div class="theorem-card-detail__subtitle-group d-flex justify-end">
        <div class="theorem-card-detail__subtitle">
          <span>
            SECTION 2.3
          </span>
        </div>
      </div>
      <img
        class="theorem-card-detail__theorem-demo"
        src="~/assets/img/theorem/theorem-demo.jpg"
      >
      <div class="theorem-card-detail__step-section">
        <div
          v-for="(item, index) in stepList"
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
            <img src="~/assets/img/theorem/theorem-demo2.jpg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stepList: [1, 2, 3, 4],
      stepActiveList: []
    }
  },
  methods: {
    onStepTitleClick (item) {
      const index = this.stepActiveList.indexOf(item)
      if (index > -1) {
        this.stepActiveList.splice(index, 1)
      } else {
        this.stepActiveList.push(item)
      }
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

  &__theorem-demo {
    width: 80%;
    margin-top: 15px;
  }

  &__subtitle-group {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  &__subtitle {
    color: white;
    font-style: italic;
    padding: 3.3px 17px 6.5px 40px;
    background-image: url('~assets/img/theorem/subtitle-bg.svg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: right;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 16px;
      line-height: 1.19;
      font-weight: 500;
    }
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
    overflow: hidden;
    display: none;

    img {
      width: 100%;
    }

    &--active {
      display: block;
    }
  }
}
</style>
