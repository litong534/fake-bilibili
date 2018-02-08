<template>
  <div id="activity">
    <div v-if="act" class="act_panel">
      <act-card :actdata="actdata" v-for="actdata in act" :key="actdata.key"></act-card>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "components/base/loading/loading";
import ActCard from "components/base/actcard/actcard";
export default {
  components: {
    Loading,
    ActCard
  },
  data() {
    return {
      act: undefined
    };
  },
  created() {
    axios.get(`/api/center`).then(res => {
      if(res.data.code === 0) {
        this.act = res.data.data.items;
      }
      console.log(this.act);
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
  overflow-y: scroll
  padding: 0 10px
  box-sizing: border-box
  .act_panel
    position: relative
</style>
