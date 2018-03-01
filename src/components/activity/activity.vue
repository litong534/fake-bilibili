<template>
  <div id="activity">
    <scroll v-if="act" class="scroll">
      <div class="act_panel">
        <act-card :actdata="actdata" v-for="actdata in act" :key="actdata.key"></act-card>
      </div>
    </scroll>
      <loading v-else></loading>
  </div>
</template>

<script>
import { baseAxios } from "@/api/common";
import Loading from "components/base/loading/loading";
import ActCard from "components/base/actcard/actcard";
import Scroll from "components/base/scroll/scroll";
export default {
  components: {
    Loading,
    ActCard,
    Scroll
  },
  data() {
    return {
      act: undefined
    };
  },
  created() {
    baseAxios.get(`/center`).then(res => {
      if (res.data.code === 0) {
        this.act = res.data.data.items;
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
#activity
  position: absolute
  left: 0
  right: 0
  bottom: 0
  top: 2.4rem
  box-sizing: border-box
  .scroll
    height: 100%
    overflow: hidden
  .act_panel
    position: relative
    padding: 0 0.266666rem 0.266666rem
</style>
