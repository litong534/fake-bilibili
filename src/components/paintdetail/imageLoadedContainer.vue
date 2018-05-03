<template>
  <div id="ILC">
    <img class="loading" v-if="!setLoaded" src="~@/assets/img_loading.png" alt="">
    <img class="true-img" v-show="setLoaded" :src="imgSrc" @load="imgIsLoaded">
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      setLoaded: false
    }
  },
  methods: {
    imgIsLoaded() {
      this.setLoaded = true
    }
  }
}
</script>

<style lang="stylus" scoped>
#ILC
  width: 100%
  .loading
    display: block
    width: 64px
    height: 64px
    margin: 0 auto
    padding: 20px 0
  .true-img
    width: 100%
    margin: 0 auto
    display: inline-block
    margin-bottom:0.266666rem

</style>
