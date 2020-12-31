<template>
  <div id="wrap">
    <div class="cube-wrapper">
      <div class="cube">
        <div class="front">
          <div v-if="list[0]" class="cube-content">
            <span @click="onSubjectClick(list[0].id, 'front')">
              {{ list[0].name }}
            </span>
          </div>
        </div>
        <div class="back">
          <div v-if="list[1]" class="cube-content">
            <span @click="onSubjectClick(list[1].id, 'back')">
              {{ list[1].name }}
            </span>
          </div>
        </div>
        <div class="top">
          <div v-if="list[2]" class="cube-content">
            <span class="cube-content__reverse" @click="onSubjectClick(list[2].id, 'top')">
              {{ list[2].name }}
            </span>
          </div>
        </div>
        <div class="bottom">
          <div v-if="list[3]" class="cube-content">
            <span class="cube-content__reverse" @click="onSubjectClick(list[3].id, 'bottom')">
              {{ list[3].name }}
            </span>
          </div>
        </div>
        <div class="left">
          <div v-if="list[4]" class="cube-content">
            <span @click="onSubjectClick(list[4].id, 'left')">
              {{ list[4].name }}
            </span>
          </div>
        </div>
        <div class="right">
          <div v-if="list[5]" class="cube-content">
            <span @click="onSubjectClick(list[5].id, 'right')">
              {{ list[5].name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { TweenLite, TimelineMax, Linear } from 'gsap'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.renderCube()
  },
  methods: {
    renderCube () {
      const $cube = $('.cube')
      const $cubeSide = $('.cube div')

      const $front = $('.cube .front')
      const $back = $('.cube .back')
      const $top = $('.cube .top')
      const $bottom = $('.cube .bottom')
      const $left = $('.cube .left')
      const $right = $('.cube .right')

      const tl = new TimelineMax({ repeat: -1, timeScale: 0.5 })

      tl.from($front, 1, { z: 150 }, 'part-1')
        .from($back, 1, { z: -150 }, 'part-1')
        .from($top, 1, { y: -100 }, 'part-1')
        .from($bottom, 1, { y: 100 }, 'part-1')
        .from($left, 1, { x: -100 }, 'part-1')
        .from($right, 1, { x: 100 }, 'part-1')
        .to($cubeSide, 1, { opacity: 1 }, 'part-1')
        .to($cube, 2, { rotationY: '+=360', transformOrigin: '50px 50px', ease: Linear.easeNone }, 'part-1')
        .to($cube, 2, { rotationX: '+=360', transformOrigin: '50px 50px', ease: Linear.easeNone }, 'part-1')
        .to($cube, 2, { rotationY: '+=360', transformOrigin: '50px 50px', ease: Linear.easeNone }, 'part-2')
        .to($cube, 2, { rotationX: '+=360', transformOrigin: '50px 50px', ease: Linear.easeNone }, 'part-2')
        .to($cubeSide, 1, { opacity: 0.7 }, 'part-2')
        .to($front, 1, { z: 150 }, 'part-2')
        .to($back, 1, { z: -150 }, 'part-2')
        .to($top, 1, { y: -100 }, 'part-2')
        .to($bottom, 1, { y: 100 }, 'part-2')
        .to($left, 1, { x: -100 }, 'part-2')
        .to($right, 1, { x: 100 }, 'part-2')

      $('.cube').on('mouseover', function () {
        tl.timeScale(0.2)
      })
      $('.cube').on('mouseleave', function () {
        tl.timeScale(1)
      })

      $('.cube div').click(function () {
        if ($(this).hasClass('active')) {
          hideSide()
        } else {
          tl.pause()
          const sideClass = $(this).attr('class')
          showSide(sideClass)
          $(this).addClass('active')
        }
      })

      function showSide (className) {
        TweenLite.to($('.' + className), 1, { scale: 3 })

        TweenLite.to($front, 1, { z: 50 })
        TweenLite.to($back, 1, { z: -50 })
        TweenLite.to($top, 1, { y: 0 })
        TweenLite.to($bottom, 1, { y: 0 })
        TweenLite.to($left, 1, { x: 0 })
        TweenLite.to($right, 1, { x: 0 })

        switch (className) {
          case 'front':
            TweenLite.to($cube, 1, { rotationX: 0, rotationY: 0 })
            TweenLite.to($front, 1, { z: 150 })
            break
          case 'back':
            TweenLite.to($cube, 1, { rotationX: 0, rotationY: 180 })
            TweenLite.to($back, 1, { z: -150 })
            break
          case 'top':
            TweenLite.to($cube, 1, { rotationX: -90, rotationY: 0 })
            TweenLite.to($top, 1, { y: -100, z: 150 })
            break
          case 'bottom':
            TweenLite.to($cube, 1, { rotationX: 90, rotationY: 0 })
            TweenLite.to($bottom, 1, { y: 100, z: 150 })
            break
          case 'left':
            TweenLite.to($cube, 1, { rotationX: 0, rotationY: 90 })
            TweenLite.to($left, 1, { x: -100, z: -150, y: 0 })
            break
          case 'right':
            TweenLite.to($cube, 1, { rotationX: 0, rotationY: -90 })
            TweenLite.to($right, 1, { x: 100, z: -150, y: -100 })
            break
        }
      }

      function hideSide () {
        $('.active').removeClass('active')
        TweenLite.to($cube, 1, { rotationY: 0, rotationX: 0, ease: Linear.easeNone, onComplete () { tl.restart() } })
        TweenLite.to($front, 1, { z: 150 })
        TweenLite.to($back, 1, { z: -150 })
        TweenLite.to($top, 1, { y: -100, z: 50 })
        TweenLite.to($bottom, 1, { y: 100, z: 50 })
        TweenLite.to($left, 1, { x: -100, z: -50, y: 0 })
        TweenLite.to($right, 1, { x: 100, z: -50, y: 0 })
        TweenLite.to($cubeSide, 1, { scale: 1 })
      }
    },
    onSubjectClick (id, target) {
      const el = document.querySelector('.' + target)
      const elClass = el.className
      if (!elClass.includes('active')) {
        return
      }
      this.$router.push({
        name: 'subject-map',
        query: {
          subject: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -50px;
  margin-left: -50px;
  z-index: 999;
}

.cube-wrapper {
  -webkit-perspective: 800px;
  -webkit-perspective-origin: 50% 50px;
  perspective: 800px;
  perspective-origin: 50% 50px;
}

.cube {
  position: relative;
  width: 100px;
  -webkit-transform-style: preserve-3d;
  -webkit-transform-origin: 50px 50px 0px;
  transform-style: preserve-3d;
  transform-origin: 50px 50px 0px;
}

.cube div {
  outline: 1px solid #999;
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.7;
  box-shadow: inset 0px 0px 50px #555;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
}

.cube div.back {
  -webkit-transform: translateZ(-50px) rotateY(180deg);
  transform: translateZ(-50px) rotateY(180deg);
  background-color: #75375D;
}
.cube div.right {
  -webkit-transform: rotateY(-270deg) translateX(50px);
  -webkit-transform-origin: top right;
  transform: rotateY(-270deg) translateX(50px);
  transform-origin: top right;
  background-color: #37754F;
}
.cube div.left {
  -webkit-transform: rotateY(270deg) translateX(-50px);
  -webkit-transform-origin: center left;
  transform: rotateY(270deg) translateX(-50px);
  transform-origin: center left;
  background-color: #d375175d;
}
.cube div.top {
  -webkit-transform: rotateX(-90deg) translateY(-50px);
  -webkit-transform-origin: top center;
  transform: rotateX(-90deg) translateY(-50px);
  transform-origin: top center;
  background-color: #B0A248;
}
.cube div.bottom {
  -webkit-transform: rotateX(90deg) translateY(50px);
  -webkit-transform-origin: bottom center;

  transform: rotateX(90deg) translateY(50px);
  transform-origin: bottom center;
  background-color: #76C6EE;
}
.cube div.front {
  -webkit-transform: translateZ(50px);
  transform: translateZ(50px);
  background-color: #eee;
}

.cube-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__reverse {
    transform: scale(1, -1)
  }
}

</style>
