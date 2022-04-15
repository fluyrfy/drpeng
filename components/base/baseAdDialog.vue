<template>
  <v-dialog
    :value="value"
    persistent
    max-width="80%"
    content-class="base-ad-dialog"
    @input="(value) => passToParent(value)"
  >
    <v-card class="base-ad-dialog__ad-box" :style="{ backgroundImage: 'url(' + adURL + ')' }">
      <div
        class="base-ad-dialog__ad-close"
        @click="onCloseBtnClick"
      >
        <p>{{ time }}秒</p>
        <p>跳過</p>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      time: 5,
      timer: null,
      adURL: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        if (this.time !== 0) {
          this.declineTime()
        } else {
          clearInterval(this.timer)
          this.passToParent(false)
        }
      }, 1000)
    })
    this.callAdApi()
  },
  methods: {
    passToParent (value) {
      this.$emit('input', value)
    },
    declineTime () {
      this.time = this.time - 1
    },
    onCloseBtnClick () {
      clearInterval(this.timer)
      this.passToParent(false)
    },
    // call廣告 api
    callAdApi () {
      const url = 'advert'
      this.$axios.$get(url).then((res) => {
        this.adURL = res.data.pic
      })
    }
  }
}
</script>

<style lang="scss">
.base-ad-dialog {
  border-radius: 0 !important;
  position: relative;
  overflow-y: visible !important;
  &__ad-box {
    border-radius: 0 !important;
    height: 400px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  &__ad-close {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 40px;
    height: 40px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #8e8e8e;
    border-radius: 50% !important;
    padding: 6px 0;

    p {
      font-size: 10px;
      color: #fff;
      font-style: italic;
      font-weight: 500;
      margin-bottom: 0;
      text-align: center;
      &:first-child {
        line-height: 1;
      }
    }
  }
}
</style>
