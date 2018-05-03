<template>
  <div id="app" @touchmove.prevent>
    <b-header/>
    <tab/>
    <router-view></router-view>
  </div>
</template>

<script>
import BHeader from 'components/base/header/header'
import Tab from 'components/base/tab/tab'
export default {
  components: {
    BHeader,
    Tab
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/index'
</style>
