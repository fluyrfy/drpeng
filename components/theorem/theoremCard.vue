<template>
  <div class="theorem-card">
    <div class="theorem-card__title-group d-flex justify-center align-center">
      <img
        src="~/assets/img/icon/pix.svg"
        class="theorem-card__title-icon"
      >
      <h2 class="theorem-card__title">
        PROOF OF LAW 04
      </h2>
    </div>
    <div class="theorem-card__content">
      <div class="theorem-card__subtitle-group d-flex justify-end">
        <div class="theorem-card__subtitle">
          <span>
            SECTION 2.3
          </span>
        </div>
      </div>
      <img src="~/assets/img/theorem/theorem-demo.jpg">
      <div class="theorem-card__step-section">
        <div class="theorem-card__step theorem-card__step--first">
          STEP 01
          <img src="~/assets/img/icon/arrow.svg">
        </div>
        <div class="theorem-card__step theorem-card__step--second">
          STEP 02
          <img src="~/assets/img/icon/arrow.svg">
        </div>
        <div class="theorem-card__step theorem-card__step--third">
          STEP 03
          <img src="~/assets/img/icon/arrow.svg">
        </div>
        <div class="theorem-card__step theorem-card__step--fourth">
          STEP 04
          <img src="~/assets/img/icon/arrow.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.theorem-card {
  width: 200px;
  margin-left: auto;
  margin-right: auto;

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
    img {
      width: 80%;
      margin-top: 15px;
    }
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
    padding: 2px 10px 2.3px 18px;
    background-image: url('~assets/img/theorem/subtitle-bg.svg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: right;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 8px;
      line-height: 1;
      font-weight: 500;
    }
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
      background: #daeff6;
    }

    &--second {
      background: #f6ebda;
    }

    &--third {
      background: #e3d2c6;
    }

    &--fourth {
      background: #e3c6c6;
    }
  }
}
</style>
