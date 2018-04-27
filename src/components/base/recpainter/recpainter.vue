<template>
  <div id="recpainter" v-if="drawer">
    <c-title>推荐画师</c-title>
    <div class="painter_container">
      <div class="painter" v-for="d in drawer" :key="d.key">
        <router-link :to="`/paint/drawer/${d.uid}`">
          <div class="img_container">
            <img :src="d.head_url" alt="">
          </div>
          <div class="painter_name">{{d.name}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { baseAxios } from '@/api/common'
import CTitle from 'components/base/c-title/c-title'
export default {
  components: {
    CTitle
  },
  data() {
    return {
      drawer: undefined
    }
  },
  created() {
    baseAxios.get(`/drawer`).then(res => {
      if (res.data.code === 0) {
        this.drawer = res.data.data
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#recpainter
  .painter_container
    width: 100%
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-items: center
    justify-content: flex-start
    padding-bottom: 0.266666rem
    .painter
      width: 33%
      display: flex
      align-items: center
      justify-content: center
      a
        display: flex
        flex-flow: column nowrap
        align-items: center
        justify-content: center
        .img_container
          width: 1.066666rem
          height: 1.066666rem
          margin: 0.266666rem 0
          border-radius: 50%
          border: 2px solid #fc6
          overflow: hidden
          >img
            width: 100%
            height: 100%
        .painter_name
          no-wrap()
</style>
