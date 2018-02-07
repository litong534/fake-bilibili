<template>
  <div id="loading">
    <img src="~@/assets/img_loading.png" width="64" alt="">
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#loading
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  justify-content: center
  align-items: center
  background: $base_dark
</style>
