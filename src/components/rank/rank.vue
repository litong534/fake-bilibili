<template>
  <div id="rank">
    <div class="category">
      <div class="cate_panel">
        <div class="cate" @click="changeCate(0)" :class="cate_index === 0 ? 'cate_active': ''">月榜</div>
        <div class="cate" @click="changeCate(1)" :class="cate_index === 1 ? 'cate_active': ''">周榜</div>
        <div class="cate" @click="changeCate(2)" :class="cate_index === 2 ? 'cate_active': ''">新人榜</div>
      </div>
    </div>
    <div class="scroll">
      <div class="rank">
        <card v-for="i in rank_active" :key="i.key" :isRank="true" :illdata="i"></card>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import Card from "components/base/illustration_card/card";
export default {
  components: {
    Card
  },
  data() {
    return {
      rank: undefined,
      cate_index: 0,
      rank_active: undefined
    };
  },
  created() {
    axios.get("/api/rank").then(res => {
      this.rank = res.data;
      this.rank_active = res.data.month.data.items;
    });
  },
  methods: {
    changeCate(index) {
      if (index === this.cate_index) {
        return;
      }
      this.cate_index = index;
      switch (this.cate_index) {
        case 0:
          this.rank_active = this.rank.month.data.items;
          break;
        case 1:
          this.rank_active = this.rank.week.data.items;
          break;
        case 2:
          this.rank_active = this.rank.day.data.items;
          break;
        default:
          return;
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#rank
  .category
    height: 60px
    padding: 10px 0
    box-sizing: border-box
    .cate_panel
      width: 200px
      height: 100%
      margin: 0 auto
      border-radius: 20px
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
        line-height: 36px
        height: 100%
        &.cate_active
          background: #bb828b
  .scroll
    position: absolute
    top: 140px
    left: 0
    right: 0
    bottom: 0
    overflow-y: scroll
    .rank
      padding: 0 10px 10px
      box-sizing: border-box
</style>
