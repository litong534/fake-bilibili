<template>
  <div id="paint" ref="paint">
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
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import Slider from "components/base/slider/slider";
import RecPainter from "components/base/recpainter/recpainter";
import Scroll from "components/base/scroll/scroll";
import Card from "components/base/illustration_card/card";
import CTitle from "components/base/c-title/c-title";
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
      isLoading: false
    };
  },
  created() {
    axios.get(`/api/getHeader`).then(res => {
      if (res.data.code === 0) {
        this.recommends = res.data.data[8];
      }
    });

    this.getRecommends(this.page);
  },
  methods: {
    onScroll() {
      this.reLoadHeight = ((this.$refs.scroll.clientHeight - this.$refs.paint.clientHeight) * 0.6) | 0;
      if (-this.$refs.scroll.getBoundingClientRect().top > this.reLoadHeight && this.isLoading === false) {
        this.isLoading = true;
        this.getRecommends(++this.page);
      }
    },
    getRecommends(page) {
      axios.get(`/api/recommends?page=${page}`).then(res => {
        if (res.data.code === 0) {
          this.illustration
            ? this.illustration = [...this.illustration,...res.data.data.items]
            : this.illustration = res.data.data.items;
          this.isLoading = false;
        }
      });
    }
  },
  mounted() {
    this.$refs.paint.addEventListener('scroll', this.onScroll, false);

  },
  destroyed() {
    this.$refs.paint.removeEventListener('scroll', this.onScroll, false);
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#paint
  position: fixed
  top: 91px
  bottom: 0
  left: 0
  right: 0
  overflow-y:scroll
  .scroll
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
