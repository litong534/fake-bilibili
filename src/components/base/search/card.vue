<template>
  <div id="card" @click="ill_detail">
    <div class="img_container" :style="`background:url(${imageClip(illdata.cover, 300, 200)}) no-repeat`">
    </div>
    <div class="ill_name" v-html="illdata.title"></div>
    <div class="drawer_intro">
      <div class="drawer_box">
        <!-- <div class="img_box">
          <img :src="imageClip(illdata.user.head_url, 100, 100)" alt="">
        </div> -->
        <div class="drawer_name" v-html="illdata.uname"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { imageClip } from 'common/js/utils'
export default {
  props: {
    illdata: {
      type: Object,
      default: undefined
    },
    isRank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    imageClip,
    ill_detail() {
      this.$router.push(
        `/paint/detail/${this.illdata.id}/${this.illdata.mid}`
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
#card
  border-radius: 0.133333rem
  background: #444
  box-sizing: border-box
  overflow: hidden
  margin-bottom: 0.266666rem
  .img_container
    width: 100%
    height: 8rem
    border-radius: 0.133333rem 0.133333rem 0 0
    overflow: hidden
    position: relative
    background-size: cover !important
  .ill_name
    padding: 0.133333rem 0 0.133333rem 0.133333rem
  .drawer_intro
    padding: 0.133333rem
    box-sizing: border-box
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    .drawer_box
      width: 50%
      display: flex
      flex-flow: row nowrap
      justify-content: flex-start
      align-items: center
      .img_box
        width: 0.8rem
        height: 0.8rem
        overflow: hidden
        border-radius: 50%
        margin-right: 0.133333rem
        > img
          width: 100%
      .drawer_name
        font-size: 0.32rem
</style>
