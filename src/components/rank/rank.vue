<template>
  <div id="rank">
    <div class="category">
      <div class="cate_panel">
        <div class="cate" @click="changeCate(0)" :class="cate_index === 0 ? 'cate_active': ''">月榜</div>
        <div class="cate" @click="changeCate(1)" :class="cate_index === 1 ? 'cate_active': ''">周榜</div>
        <div class="cate" @click="changeCate(2)" :class="cate_index === 2 ? 'cate_active': ''">新人榜</div>
      </div>
    </div>
    <scroll class="scroll">
      <div class="rank">
        <card v-for="i in rank_active" :key="i.key" :isRank="true" :illdata="i"></card>
      </div>
    </scroll>
    <router-view/>
  </div>
</template>

<script>
import Card from 'components/base/illustration_card/card'
import { baseAxios } from '@/api/common'
import Scroll from 'components/base/scroll/scroll'
export default {
  components: {
    Card,
    Scroll
  },
  data() {
    return {
      rank: undefined,
      cate_index: 0,
      rank_active: undefined
    }
  },
  created() {
    baseAxios.get(`/rank`).then(res => {
      this.rank = res.data
      this.rank_active = res.data.month.data.items
    })
  },
  methods: {
    changeCate(index) {
      if (index === this.cate_index) {
        return
      }
      this.cate_index = index
      switch (this.cate_index) {
        case 0:
          this.rank_active = this.rank.month.data.items
          break
        case 1:
          this.rank_active = this.rank.week.data.items
          break
        case 2:
          this.rank_active = this.rank.day.data.items
          break
        default:

          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#rank
  .category
    height: 1.6rem
    padding: 0.266666rem 0
    box-sizing: border-box
    .cate_panel
      width: 5.333333rem
      height: 100%
      margin: 0 auto
      border-radius: 0.533333rem
      border: 2px solid #bb828b
      background: #9357a9
      box-sizing: border-box
      display: flex
      justify-content: center
      align-items: center
      overflow: hidden
      .cate
        flex: 1
        text-align: center
        line-height: 0.96rem
        height: 100%
        &.cate_active
          background: #bb828b
  .scroll
    position: absolute
    top: 3.733333rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .rank
      padding: 0 0.266666rem 0.266666rem
      box-sizing: border-box
</style>
