<template>
  <div class="index">
    <cube />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cube from '~/components/index/cube.vue'
export default {
  components: {
    cube
  },
  data () {
    return {
      cubeRender: false
    }
  },
  computed: {
    ...mapState('api', ['subjectList']),
    cubeData () {
      if (!this.subjectList.length) {
        return []
      }

      return this.subjectList.filter((item, index) => index < 6)
    }
  },
  async mounted () {
    await this.getSubjectList()
  },
  methods: {
    ...mapActions('api', ['getSubjectList'])
  }
}
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('~assets/img/index/cube-bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
