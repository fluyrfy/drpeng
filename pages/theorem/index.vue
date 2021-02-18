<template>
  <div class="theorem">
    <loading :active.sync="isLoading" />
    <base-search
      :options="allFormulaList"
      :no-input="true"
      @input="onSearchInput"
      @mapClick="onMapClick"
    />
    <div
      v-hammer:panend="(event) => onSectionPanEnd(event)"
      v-hammer:pan="(event) => onSectionPan(event)"
      v-hammer:pinch="(event) => onSectionPinch(event)"
      v-hammer:pinchend="(event) => onSectionPinchEnd(event)"
      class="theorem-card-section"
    >
      <div class="theorem-card-container">
        <theorem-card
          v-for="(item, index) in handleRandomFormulaList"
          :key="index"
          :card-info="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import baseSearch from '~/components/base/baseSearch.vue'
import theoremCard from '~/components/theorem/theoremCard.vue'
export default {
  components: {
    'base-search': baseSearch,
    'theorem-card': theoremCard
  },
  data () {
    return {
      searchText: '',
      prevTop: null,
      prevLeft: null,
      prevScale: null
    }
  },
  computed: {
    ...mapState('api', ['randomFormulaList', 'allFormulaList', 'isLoading']),
    handleRandomFormulaList () {
      if (!this.randomFormulaList.length) {
        return []
      }

      const randomLength = this.randomFormulaList.length
      const randomList = []

      for (let i = 0; i < randomLength; i++) {
        randomList.push(i)
      }

      const list = this.randomFormulaList.map((item, index) => {
        const obj = Object.assign({}, item)
        const num = Math.floor(Math.random() * randomList.length)

        obj.sort = index
        obj.randomTop = randomList[num]

        randomList.splice(num, 1)

        return obj
      })

      return list
    },
    handleRandomFormulaListMap () {
      if (!this.handleRandomFormulaList.length) {
        return new Map([])
      }

      return new Map(this.handleRandomFormulaList.map((item) => {
        return [
          item.name,
          item.id
        ]
      }))
    }
  },
  async mounted () {
    await this.getFormulaList()
  },
  methods: {
    ...mapActions('api', ['getFormulaList']),
    onSearchInput (value) {
      const detailId = this.handleRandomFormulaListMap.get(value)

      if (detailId) {
        this.$router.push({
          name: 'theorem-detail',
          query: {
            id: detailId
          }
        })
      }
    },
    onMapClick () {
      this.$router.push({
        name: 'subject-map-subjectCategory',
        params: {
          subjectCategory: this.$route.query.subjectCategory ? this.$route.query.subjectCategory : '1'
        }
      })
    },
    onSectionPan (event) {
      const target = document.querySelector('.theorem-card-container')

      target.style.top = `${this.prevTop + event.deltaY}px`
      target.style.left = `${this.prevLeft + event.deltaX}px`
    },
    onSectionPanEnd () {
      const target = document.querySelector('.theorem-card-container')
      const topPixelIndex = target.style.top.indexOf('px')
      const leftPixelIndex = target.style.left.indexOf('px')

      this.prevTop = parseInt(target.style.top.slice(0, topPixelIndex))
      this.prevLeft = parseInt(target.style.left.slice(0, leftPixelIndex))
    },
    onSectionPinch (event) {
      const target = document.querySelector('.theorem-card-container')
      if (event.additionalEvent === 'pinchout') {
        target.style.transform = `scale(${this.prevScale + event.scale})`
      } else {
        target.style.transform = `scale(${this.prevScale - event.scale < 0 ? 0.1 : this.prevScale - event.scale})`
      }
    },
    onSectionPinchEnd (event) {
      if (event.additionalEvent === 'pinchout') {
        this.prevScale += event.scale
      } else {
        this.prevScale = this.prevScale - event.scale < 0 ? 0.1 : this.prevScale - event.scale
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.theorem-card-section {
  background-image: url('~assets/img/theorem/theorem-bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.theorem-card-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
