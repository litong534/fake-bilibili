<template>
  <a :href="actdata.link">
    <div id="actcard">
      <div class="img_container">
        <img :src="imageClip(actdata.cover, 300, 200)" alt="">
        <div class="fin">{{actdata.desc}}</div>
      </div>
      <div class="act_intro">
        <div class="title">{{actdata.title}}</div>
        <div class="date">{{timeFormat(actdata.start_time)}}</div>
      </div>
    </div>
  </a>
</template>

<script>
import { imageClip } from 'common/js/utils'
export default {
  props: {
    actdata: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    imageClip,
    timeFormat(time) {
      let date = new Date(parseInt(time) * 1000).toLocaleDateString()
      let dateArr = date.split('/')
      return `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    }
  }
}
</script>

<style lang="stylus" scoped>
#actcard
  border-radius: 0.133333rem
  background: #444
  box-sizing: border-box
  overflow: hidden
  margin-bottom: 0.266666rem
  .img_container
    width: 100%
    padding-top: 5.04rem
    border-radius: 0.133333rem 0.133333rem 0 0
    overflow: hidden
    position: relative
    > img
      position: absolute
      top: 0
      left: 0
      width: 100%
  .fin
    position: absolute
    top: 0
    right: 0
    width: 100%
    background: rgba(0, 0, 0, 0.3)
    padding: 0.133333rem 0.266666rem 0.133333rem 0
    text-align: right
  .act_intro
    padding-left: 0.266666rem
    box-sizing: border-box
    > div
      margin: 0.133333rem
    .date
      font-size: 0.32rem
</style>
