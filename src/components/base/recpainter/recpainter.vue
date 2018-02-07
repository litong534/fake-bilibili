<template>
  <div id="recpainter" v-if="drawer">
    <div class="header">推荐画师</div>
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
import axios from "axios";
export default {
  data() {
    return {
      drawer: undefined
    };
  },
  created() {
    axios.get("/api/drawer").then(res => {
      if (res.data.code === 0) {
        this.drawer = res.data.data;
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
#recpainter
  .header
    background: #fb6b55
    padding: 5px 0 5px 5px
    border-left: 5px solid #c0c46d
  .painter_container
    display: flex
    flex-flow: row wrap
    align-items: center
    justify-content: flex-start
    padding-bottom: 10px
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
          width: 40px
          height: 40px
          margin: 10px 0
          border-radius: 50%
          border: 2px solid #fc6
          overflow: hidden
          >img
            width: 100%
            height: 100%
</style>
