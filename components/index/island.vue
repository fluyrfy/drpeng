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
          :src="(index + 1) % 12 === 0 ? require('~/assets/img/map/island-12.svg') : require(`~/assets/img/map/island-${(index + 1) % 12}.svg`)"
        >
        <h2>
          {{ subject.title }}
        </h2>
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
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        },
        {
          title: 'Calculus'
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.changeMapWidth()
    })
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
    },
    changeMapWidth () {
      const islandList = document.querySelectorAll('.island')
      const lastIsland = islandList[islandList.length - 1]
      const pxIndex = lastIsland.style.left.indexOf('px')
      const lastPosition = parseInt(lastIsland.style.left.substring(0, pxIndex))

      const bg = document.querySelector('.bg')
      bg.style.width = `${lastPosition * 1.05}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 1740px;
  height: 100vh;
  background-image: url('~assets/img/index/index-bg.jpg');
  background-size: cover;
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

      h2 {
        color: #5d361f;
        position: absolute;
        left: 55%;
        top: 40%;
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
