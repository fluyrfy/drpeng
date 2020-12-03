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
      <div
        class="bg-transition"
        :class="{'bg-transition__active': isTransition}"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: -1,
      isTransition: false,
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
      if (index === this.selected && (index + 1) % 12 !== 2) {
        className += ' highlight'
      } else if (index === this.selected && (index + 1) % 12 === 2) {
        className += ' seaHorseHighlight'
      }

      return className
    },
    enlarge (index) {
      this.selected = index
      const transition = document.querySelector('.bg-transition')
      transition.style.display = 'block'

      setTimeout(() => {
        transition.style.background = '#daeff6'
        setTimeout(() => {
          this.isTransition = true
        }, 1000)
      }, 600)

      setTimeout(() => {
        this.$router.push({
          name: 'subject-category',
          params: {
            category: '456'
          }
        })
      }, 2500)
    },
    changeMapWidth () {
      const islandList = document.querySelectorAll('.island')
      const lastIsland = islandList[islandList.length - 1]
      const pxIndex = lastIsland.style.left.indexOf('px')
      const lastPosition = parseInt(lastIsland.style.left.substring(0, pxIndex))

      const bg = document.querySelector('.bg')
      bg.style.width = `${lastPosition * 1.08}px`
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
      &.seaHorseHighlight {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 1001;
        top: 70vh !important;
        left: 0 !important;
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
        animation-fill-mode: forwards;
      }
    }
  }
}

.bg-transition {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: none;

  &__active {
    background: #f6ebda !important;
    transition: all 1s;
  }
}

.highlight {
  animation: clipCircleIn 1.2s;
  animation-fill-mode: forwards;

  h2 {
    animation-fill-mode: forwards;
    animation: disappear .6s;
  }
}

.seaHorseHighlight {
  animation: clipCircleIn 1.2s;
  animation-fill-mode: forwards;

  h2 {
    animation-fill-mode: forwards;
    animation: disappear .6s;
  }
}
@keyframes clipCircleIn {
  0% {
    clip-path: circle(0);
  }
  50% {
    clip-path: circle(600px);
  }
  99% {
    opacity: 1;
  }
  100% {
    transform: scale(30);
    opacity: 0;
  }
}

@keyframes disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
