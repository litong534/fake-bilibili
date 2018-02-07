<template>
  <div id="b_header">
    <div class="space">
      <img v-if="needsBack" src="~@/assets/left_arrow.png" width="25" style="padding-left:10px" @click="goBack" alt="">
    </div>
    <div>{{title}}</div>
    <div class="space"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "假bilibili分站--(゜-゜)つロ 干杯~"
    },
    needsBack : {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#b_header
  width: 100%
  background: #444
  height: 40px
  box-shadow: 0 2px 2px #222
  display: flex
  align-items: center
  .space
    space()
</style>
