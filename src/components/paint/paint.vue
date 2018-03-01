<template>
<div id="paint">
  <scroll :pullUpload="pullUploadObj" @pullingUp="upLoad" class="paint-content" ref="paint">
    <div ref="scroll">
      <div class="slider-wrapper" v-if="recommends">
        <slider>
          <div v-for="item in recommends" :key="item.key">
            <a :href="item.link">
              <img class="needsclick" style="width: 100%;" :src="item.cover" alt="" />
            </a>
          </div>
        </slider>
      </div>
      <rec-painter/>
      <c-title v-if="illustration">推荐作品</c-title>
      <div class="ill_panel" v-if="illustration">
        <card v-for="i in illustration" :key="i.key" :illdata="i"></card>
      </div>
    </div>
  </scroll>
  <router-view/>
</div>
</template>

<script>
import Slider from "components/base/slider/slider";
import RecPainter from "components/base/recpainter/recpainter";
import Scroll from "components/base/scroll/scroll";
import Card from "components/base/illustration_card/card";
import CTitle from "components/base/c-title/c-title";
import { baseAxios } from "@/api/common";
export default {
  components: {
    Slider,
    RecPainter,
    Scroll,
    Card,
    CTitle
  },
  data() {
    return {
      recommends: undefined,
      illustration: undefined,
      listenScroll: true,
      page: 1,
      isLoading: false,
      pullUploadObj: {
        threshold: 10000
      }
    };
  },
  created() {
    baseAxios.get(`/getHeader`).then(res => {
      if (res.data.code === 0) {
        this.recommends = res.data.data[8];
      }
    });
    this.getRecommends(this.page);
  },
  methods: {
    upLoad() {
      this.getRecommends(++this.page);
    },
    getRecommends(page) {
      baseAxios.get(`/recommends?page=${page}`).then(res => {
        if (res.data.code === 0) {
          this.illustration
            ? (this.illustration = [
                ...this.illustration,
                ...res.data.data.items
              ])
            : (this.illustration = res.data.data.items);
          this.isLoading = false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#paint
  position: fixed
  top: 2.426666rem
  bottom: 0
  left: 0
  right: 0
  .paint-content
    height: 100%
    overflow: hidden    
    .slider-wrapper
      width: 100%
      overflow: hidden
      position: relative
    .ill_panel
      padding: 10px
      box-sizing: border-box
</style>
