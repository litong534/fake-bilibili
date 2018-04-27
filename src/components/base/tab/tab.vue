<template>
  <div id="tab">
    <router-link tag="div" replace to="/paint" class="tab-item">画友</router-link>
    <!-- <router-link tag="div" replace to="photo" class="tab-item">摄影</router-link> -->
    <router-link tag="div" replace to="/rank" class="tab-item">排行榜</router-link>
    <router-link tag="div" replace to="/activity" class="tab-item">活动中心</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
#tab
  position: relative
  width: 100%
  height: 1.266666rem
  display: flex
  flex-flow: row nowrap
  align-items: center
  .tab-item
    flex: 1
    text-align: center
    line-height: 1.066666rem
    border-bottom: 0.026666rem solid transparent
    &.router-link-active
      border-bottom: 0.026666rem solid #ffcc66
</style>
