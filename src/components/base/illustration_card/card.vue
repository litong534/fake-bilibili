<template>
  <div id="card" @click="ill_detail">
    <div class="img_container">
      <img :src="illdata.item.pictures[0].img_src" alt="">
    </div>
    <div class="ill_name">{{illdata.item.title}}</div>
    <div class="drawer_intro">
      <div class="drawer_box">
        <div class="img_box">
          <img v-lazy="illdata.user.head_url" alt="">
        </div>
        <div class="drawer_name">{{illdata.user.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
    ill_detail() {
      this.isRank ? this.$router.push(`/rank/detail/${this.illdata.item.doc_id}/${this.illdata.user.uid}`) : this.$router.push(`/paint/detail/${this.illdata.item.doc_id}/${this.illdata.user.uid}`);
    }
  }
};
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
    padding-top: 8rem
    border-radius: 0.133333rem 0.133333rem 0 0
    overflow: hidden
    position: relative
    > img
      position: absolute
      top: 0
      left: 0
      width: 100%
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
        overflow hidden
        border-radius: 50%
        margin-right: 0.133333rem
        > img
          width: 100%
      .drawer_name
        font-size: 0.32rem
</style>
