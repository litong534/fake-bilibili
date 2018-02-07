<template>
  <div id="card" @click="ill_detail">
    <div class="img_container">
      <img :src="imageClip(illdata.item.pictures[0].img_src)" alt="">
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
    }
  },
  methods: {
    imageClip(url) {
      return url.replace('jpg','jpg@512w_384h_1e.webp');
    },
    ill_detail() {
      this.$router.push(`/paint/detail/${this.illdata.item.doc_id}/${this.illdata.user.uid}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
#card
  border-radius: 5px
  background: #444
  box-sizing: border-box
  overflow: hidden
  margin-bottom: 10px
  .img_container
    width: 100%
    padding-top: 200px
    border-radius: 5px 5px 0 0
    overflow: hidden
    position: relative
    > img
      position: absolute
      top: 0
      left: 0
      width: 100%
  .ill_name
    padding: 5px 0 5px 5px
  .drawer_intro
    padding: 5px
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
        width: 30px
        height: 30px
        overflow hidden
        border-radius: 50%
        margin-right: 10px
        > img
          width: 100%
          heihgt: 100%
      .drawer_name
        font-size: 12px
</style>
