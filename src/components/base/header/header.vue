<template>
  <div id="b_header">
    <div class="space">
      <img v-if="needsBack" src="~@/assets/left_arrow.png" width="25" style="padding-left:10px" @click="goBack" alt="">
    </div>
    <div>{{title}}</div>
    <div class="space" style="overflow: hidden">
      <router-link v-if="needsSearch && checkRoute" to="/search" tag="div"><img src="~@/assets/search.png" width="25" style="float: right;margin-right:10px" alt=""></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '假bilibili分站--(゜-゜)つロ 干杯~'
    },
    needsBack: {
      type: Boolean,
      default: false
    },
    needsSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkRoute: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (/^(\/paint|\/rank|\/activity)$/.test(newRoute.path)) {
        this.checkRoute = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#b_header
  position: relative
  width: 100%
  background: #444
  height: 1.066666rem
  box-shadow: 0 0.053333rem 0.053333rem #222
  display: flex
  align-items: center
  .space
    space()
</style>
