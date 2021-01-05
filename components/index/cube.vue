<template>
  <div id="wrapper">
    <div class="viewport">
      <div class="cube">
        <div
          v-for="item in list"
          :key="item.id"
          class="side"
        >
          <div
            :id="item.id"
            class="cube-image"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [
        {
          title: '化學',
          id: 1
        },
        {
          title: '國文',
          id: 2
        },
        {
          title: '數學',
          id: 3
        },
        {
          title: '英文',
          id: 4
        },
        {
          title: '物理',
          id: 5
        },
        {
          title: '微積分',
          id: 6
        }
      ]
    }
  },
  data () {
    return {
      events: null,
      viewport: null,
      activeItem: {}
    }
  },
  computed: {
    listMap () {
      if (!this.list.length) {
        return new Map([])
      }

      return new Map(this.list.map((item) => {
        return [
          item.id,
          item
        ]
      }))
    }
  },
  mounted () {
    this.createEvents()
    this.setViewPortProto()
    this.setCube(this)
    this.$nextTick(() => {
      this.getActiveItem()
    })
  },
  methods: {
    createEvents () {
      function Events () {
        this.events = {}
      }

      this.events = new Events()
      this.events.add = function (obj) {
        obj.events = {}
      }
      this.events.implement = function (fn) {
        fn.prototype = Object.create(Events.prototype)
      }

      Events.prototype.on = function (name, fn) {
        const events = this.events[name]
        if (events !== undefined && !events.includes(fn)) {
          events.push(fn)
          this.emit('event:on', fn)
        } else {
          this.events[name] = [fn]
          this.emit('event:on', fn)
        }

        return this
      }

      Events.prototype.once = function (name, fn) {
        const events = this.events[name]
        fn.once = true
        if (events && !events.includes(fn)) {
          events.push(fn)
          this.emit('event:once', fn)
        } else {
          this.events[name] = [fn]
          this.emit('event:once', fn)
        }

        return this
      }

      Events.prototype.emit = function (name, args) {
        const events = this.events[name]
        if (events) {
          let i = events.length
          while (i--) {
            if (events[i]) {
              events[i].call(this, args)
              if (events[i].once) {
                delete events[i]
              }
            }
          }
        }
        return this
      }

      Events.prototype.unbind = function (name, fn) {
        if (name) {
          const events = this.events[name]
          if (events) {
            if (fn) {
              const i = events.indexOf(fn)
              if (i !== -1) {
                delete events[i]
              }
            } else {
              delete this.events[name]
            }
          }
        } else {
          delete this.events
          this.events = {}
        }
        return this
      }
    },
    bindEvent (element, type, handler) {
      element.addEventListener ? element.addEventListener(type, handler, { passive: false }) : element.attachEvent('on' + type, handler)
    },
    setViewPortProto () {
      function Viewport (data, vm) {
        vm.events.add(this)

        const self = this

        this.element = data.element
        this.fps = data.fps
        this.sensivity = data.sensivity
        this.sensivityFade = data.sensivityFade
        this.touchSensivity = data.touchSensivity
        this.speed = data.speed

        this.lastX = 0
        this.lastY = 0
        this.mouseX = 0
        this.mouseY = 0
        this.distanceX = 0
        this.distanceY = 0
        this.positionX = 1122
        this.positionY = 136
        this.torqueX = 0
        this.torqueY = 0

        this.down = false
        this.upsideDown = false

        this.previousPositionX = 0
        this.previousPositionY = 0

        this.currentSide = 0
        this.calculatedSide = 0

        vm.bindEvent(document, 'mousedown', function () {
          self.down = true
        })

        vm.bindEvent(document, 'mouseup', function () {
          self.down = false
        })

        vm.bindEvent(document, 'keyup', function () {
          self.down = false
        })

        vm.bindEvent(document, 'mousemove', function (e) {
          self.mouseX = e.pageX
          self.mouseY = e.pageY
        })

        vm.bindEvent(document, 'touchstart', function (e) {
          self.down = true
          e = e.touches ? e.touches[0] : null
          self.mouseX = e.pageX / self.touchSensivity
          self.mouseY = e.pageY / self.touchSensivity
          self.lastX = self.mouseX
          self.lastY = self.mouseY
        })

        vm.bindEvent(document, 'touchmove', function (e) {
          if (e.preventDefault) {
            e.preventDefault()
          }

          if (e.touches.length === 1) {
            e = e.touches ? e.touches[0] : null

            self.mouseX = e.pageX / self.touchSensivity
            self.mouseY = e.pageY / self.touchSensivity
          }
        })

        vm.bindEvent(document, 'touchend', function (e) {
          self.down = false
        })

        setInterval(this.animate.bind(this), this.fps)
      }
      this.events.implement(Viewport)

      Viewport.prototype.animate = function () {
        this.distanceX = (this.mouseX - this.lastX)
        this.distanceY = (this.mouseY - this.lastY)

        this.lastX = this.mouseX
        this.lastY = this.mouseY

        if (this.down) {
          this.torqueX = this.torqueX * this.sensivityFade + (this.distanceX * this.speed - this.torqueX) * this.sensivity
          this.torqueY = this.torqueY * this.sensivityFade + (this.distanceY * this.speed - this.torqueY) * this.sensivity
        }

        if (Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
          if (!this.down) {
            this.torqueX *= this.sensivityFade
            this.torqueY *= this.sensivityFade
          }

          this.positionY -= this.torqueY

          if (this.positionY > 360) {
            this.positionY -= 360
          } else if (this.positionY < 0) {
            this.positionY += 360
          }

          if (this.positionY > 90 && this.positionY < 270) {
            this.positionX -= this.torqueX

            if (!this.upsideDown) {
              this.upsideDown = true
              this.emit('upsideDown', { upsideDown: this.upsideDown })
            }
          } else {
            this.positionX += this.torqueX

            if (this.upsideDown) {
              this.upsideDown = false
              this.emit('upsideDown', { upsideDown: this.upsideDown })
            }
          }

          if (this.positionX > 360) {
            this.positionX -= 360
          } else if (this.positionX < 0) {
            this.positionX += 360
          }

          if (!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
            if (this.upsideDown) {
              if (this.positionX >= 42 && this.positionX <= 130) {
                this.calculatedSide = 3
              } else if (this.positionX >= 131 && this.positionX <= 223) {
                this.calculatedSide = 2
              } else if (this.positionX >= 224 && this.positionX <= 314) {
                this.calculatedSide = 5
              } else {
                this.calculatedSide = 4
              }
            } else if (!this.upsideDown) {
              if (this.positionX >= 42 && this.positionX <= 130) {
                this.calculatedSide = 5
              } else if (this.positionX >= 131 && this.positionX <= 223) {
                this.calculatedSide = 4
              } else if (this.positionX >= 224 && this.positionX <= 314) {
                this.calculatedSide = 3
              } else {
                this.calculatedSide = 2
              }
            }
          } else {
            if (this.positionY >= 46 && this.positionY <= 130) {
              this.calculatedSide = 6
            }

            if (this.positionY >= 220 && this.positionY <= 308) {
              this.calculatedSide = 1
            }
          }

          if (this.calculatedSide !== this.currentSide) {
            this.currentSide = this.calculatedSide
            this.emit('sideChange')
          }
        }

        this.element.style.transform = 'rotateX(' + this.positionY + 'deg) rotateY(' + this.positionX + 'deg)'

        if (this.positionY !== this.previousPositionY || this.positionX !== this.previousPositionX) {
          this.previousPositionY = this.positionY
          this.previousPositionX = this.positionX

          this.emit('rotate')
        }
      }

      this.viewport = new Viewport({
        element: document.getElementsByClassName('cube')[0],
        fps: 20,
        sensivity: 0.1,
        sensivityFade: 0.93,
        speed: 2,
        touchSensivity: 1.5
      }, this)
    },
    setCube (vm) {
      function Cube (data) {
        const self = this

        this.element = data.element
        this.sides = this.element.getElementsByClassName('side')

        this.viewport = data.viewport
        this.viewport.on('rotate', function () {
          self.rotateSides()
        })
        this.viewport.on('upsideDown', function (obj) {
          self.upsideDown(obj)
        })
        this.viewport.on('sideChange', function () {
          self.sideChange()
        })
      }

      Cube.prototype.rotateSides = function () {
        const viewport = this.viewport
        if (viewport.positionY > 90 && viewport.positionY < 270) {
          this.sides[0].getElementsByClassName('cube-image')[0].style.transform = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)'
          this.sides[5].getElementsByClassName('cube-image')[0].style.transform = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)'
        } else {
          this.sides[0].getElementsByClassName('cube-image')[0].style.transform = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)'
          this.sides[5].getElementsByClassName('cube-image')[0].style.transform = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)'
        }
      }
      Cube.prototype.upsideDown = function (obj) {
        const deg = (obj.upsideDown === true) ? '180deg' : '0deg'
        let i = 5

        while (i > 0 && --i) {
          this.sides[i].getElementsByClassName('cube-image')[0].style.transform = 'rotate(' + deg + ')'
        }
      }
      Cube.prototype.sideChange = function () {
        for (let i = 0; i < this.sides.length; ++i) {
          this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image'
        }
        this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active'
        vm.getActiveItem()
      }
      /* eslint-disable-next-line */
      new Cube({
        viewport: this.viewport,
        element: document.getElementsByClassName('cube')[0]
      })
    },
    getActiveItem () {
      if (!document) {
        return
      }
      const active = document.querySelector('.active')

      this.activeItem = active ? this.listMap.get(parseInt(active.id)) : {}
    }
  }
}
</script>

<style lang="scss" scoped>
.viewport {
  perspective: 800px;
  perspective-origin: 50% 200px;
  transform: scale(0.8, 0.8);
  -webkit-box-reflect: below 170px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0%, transparent), to(rgba(250, 250, 250, 0.1)));
  @include lessThan($--breakpoints-xs) {
    transform: scale(0.6, 0.6);
  }
}

.cube {
  position: relative;
  margin: 0 auto;
  height: 200px;
  width: 200px;
  transform-style: preserve-3d;
  transform: rotateX(136deg) rotateY(1122deg);
}

.cube > div {
  overflow: hidden;
  position: absolute;
  opacity: 0.9;
  height: 200px;
  width: 200px;
  background-image: url("https://jordizle.com/static/img/codepen/blank.png");
  -webkit-touch-callout: none;
  -moz-touch-callout: none;
  -ms-touch-callout: none;
  -o-touch-callout: none;
  user-select: none;
}

.cube > div > div.cube-image {
  width: 200px;
  height: 200px;
  transform: rotate(180deg);
  line-height: 200px;
  font-size: 60px;
  text-align: center;
  font-weight: bold;
  color: #1b9bd8;
  transition: color 600ms;
}

.cube > div > div.cube-image.active {
  color: red;
}

.cube > div {
  &:hover {
    cursor: pointer;
  }

  &:active {
    cursor: pointer;
  }
}

.cube > div {
  &:first-child {
    transform: rotateX(90deg) translateZ(100px);
    outline: 1px solid transparent;
  }

  &:nth-child(2) {
    transform: translateZ(100px);
    outline: 1px solid transparent;
  }

  &:nth-child(3) {
    transform: rotateY(90deg) translateZ(100px);
    outline: 1px solid transparent;
  }

  &:nth-child(4) {
    transform: rotateY(180deg) translateZ(100px);
    outline: 1px solid transparent;
  }

  &:nth-child(5) {
    transform: rotateY(-90deg) translateZ(100px);
    outline: 1px solid transparent;
  }

  &:nth-child(6) {
    transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
    outline: 1px solid transparent;
  }
}

object {
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>
