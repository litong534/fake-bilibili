<template>
  <a :href="actdata.link">
    <div id="actcard">
      <div class="img_container">
        <img :src="imageClip(actdata.cover)" alt="">
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
export default {
  props: {
    actdata: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    imageClip(url) {
      return url.replace("jpg", "jpg@512w_240h_1e.webp");
    },
    timeFormat(time) {
      let date = new Date(parseInt(time) * 1000).toLocaleDateString();
      let dateArr = date.split("/");
      return `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`;
    }
  }
};
</script>

<style lang="stylus" scoped>
#actcard
  border-radius: 5px
  background: #444
  box-sizing: border-box
  overflow: hidden
  margin-bottom: 10px
  .img_container
    width: 100%
    padding-top: 210px
    border-radius: 5px 5px 0 0
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
    background: rgba(0,0,0,0.3)
    padding: 5px 10px 5px 0
    text-align: right
  .act_intro
    padding-left: 10px
    box-sizing: border-box
    > div
      margin: 5px
    .title
      font-size: 14px
    .date
      font-size: 12px
</style>
