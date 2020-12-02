<template>
  <div class="bg in">
    <div class="bg-inner">
      <div
        v-for="(subject, index) in subjects"
        :key="index"
        :style="`left: ${index * 300 + 50}px; top: ${(index + 1) % 2 * 20 + 20}vh`"
        :class="siwtchClass(index)"
        @click="enlarge(index)"
      >
        <img
          src="~assets/img/map/island.png"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: -1,
      subjects: [
        {
          title: 'Calculus',
          img: 'island.png'
        },
        {
          title: 'Calculus',
          img: 'island.png'
        },
        {
          title: 'Calculus',
          img: 'island.png'
        },
        {
          title: 'Calculus',
          img: 'island.png'
        },
        {
          title: 'Calculus',
          img: 'island.png'
        }
      ]
    }
  },
  methods: {
    siwtchClass (index) {
      let className = 'island'
      if (index % 2 === 1) {
        className += ' rotate'
      }
      if (index === this.selected) {
        className += ' highlight'
      }

      return className
    },
    enlarge (index) {
      this.selected = index
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 1736px;
  height: 100vh;
  background-image: url('~assets/img/map/island-map.jpg');
  background-size: cover;
  // background-position: center center;
  background-repeat: no-repeat;
  .bg-inner {
    position: relative;
    width: 100%;
    height: 100%;
    .island {
      position: absolute;
      width: 200px;
      z-index: 1;
      &::before {
        content: '';
        display: block;
        width: 300px;
        height: 4px;
        position: absolute;
        left: 50%;
        top: 50px;
        z-index: -1;
        transform: rotate(140deg);
        // https://stackoverflow.com/questions/6250394/how-to-increase-space-between-dotted-border-dots
        background-image: linear-gradient(to right, #fff 33%, rgba(255,255,255,0) 0%);
        background-position: bottom;
        background-size: 30px 4px;
        background-repeat: repeat-x;
      }
      &.rotate {
        &::before {
          top: 250px;
          transform: rotate(-140deg);
        }
      }
      &.highlight {
        // scale: 1.1;
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0 !important;
        top: 0 !important;
        z-index: 1001;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:last-child {
        &::before {
          display: none;
        }
      }
    }
  }
}
.highlight {
    animation: clipCircleIn .6s;
}
@keyframes clipCircleIn {
    0%   { clip-path: circle(0); }
    100% { clip-path: circle(600px); }
}
</style>
