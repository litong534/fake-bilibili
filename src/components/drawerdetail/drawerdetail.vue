<template>
  <transition name="slide">
    <div id="drawer_detail" @touchmove.stop>
      <d-header :needsBack="true" title="作品详情"></d-header>
      <div ref="d_fix" v-if="show" class="drawer_container_fixed">
        <div class="drawer_circle">
          <img :src="drawerDetail.face" alt="">
        </div>
        <div class="userinfo">
          <span class="uname">{{drawerDetail.uname}}</span>
          <span class="grp">
            <span class="level">UL {{user.user.user_level}}</span>
            <span class="level">UP {{user.user.master_level}}</span>
          </span>
        </div>
        <div class="focus_btn" @click="focus" :class="user.feed.is_followed ? 'unfocus_btn': ''">{{user.feed.is_followed ? '取消关注' : '关注'}}</div>
      </div>
      <scroll :probeType="3" :listen-scroll="true" @scrollEnd="onScrollEnd" class="main" ref="main" @scroll="onScroll" v-if="drawerDetail && user && drawerill">
        <div ref="scroll">
          <div ref="d_cont" class="drawer_container">
            <div class="drawer_bg">
              <img :src="drawerDetail.face" alt="">
            </div>
            <div ref="circle" class="drawer_circle">
              <img :src="drawerDetail.face" alt="">
            </div>
            <div ref="uinfo" class="userinfo">
              <span class="uname">{{drawerDetail.uname}}</span>
              <span class="grp">
                <span class="level">UL {{user.user.user_level}}</span>
                <span class="level">UP {{user.user.master_level}}</span>
              </span>
              <span class="grp grp_feed">
                <span class="feed right">关注: {{user.feed.feed_count}}</span>
                <span class="feed left">粉丝: {{user.feed.fans_count}}</span>
              </span>
              <div class="focus_btn" @click="focus" :class="user.feed.is_followed ? 'unfocus_btn': ''">{{user.feed.is_followed ? '取消关注' : '关注'}}</div>
            </div>
          </div>
          <div>
            <c-title>直播间: {{user.room.title}}</c-title>
            <div class="room">
              <a :href="user.room.room_link">
                <img :src="user.room.cover" alt="">
              </a>
            </div>
          </div>
          <div class="header"></div>
          <c-title>相簿</c-title>
          <div class="illustration" :style="{'width': `${containerWidth}px`}">
            <div class="img_container" :style="{'width': `${img_width}px`, 'height': `${img_width}px`}" @click="showDetail(item.doc_id)" v-for="item in drawerill" :key="item.key">
              <img class="ill" :src="item.pictures[0].img_src" alt="">
            </div>
          </div>
        </div>
      </scroll>
      <loading v-else></loading>
      <router-view/>
    </div>
  </transition>
</template>

<script>
import DHeader from "components/base/header/header";
import Loading from "components/base/loading/loading";
import CTitle from "components/base/c-title/c-title";
import {baseAxios} from "@/api/common";
import Scroll from "components/base/scroll/scroll";
export default {
  components: {
    Loading,
    DHeader,
    CTitle,
    Scroll
  },
  data() {
    return {
      drawerDetail: undefined,
      user: undefined,
      drawerill: undefined,
      show: false,
      scrollFlg: false
    };
  },
  created() {
    baseAxios.get(`/drawerdetail?uid=${this.$route.params.uid}`).then(res => {
      if (res.data.code === 0) {
        this.drawerDetail = res.data.data;
      }
    });

    baseAxios.get(`/user?uid=${this.$route.params.uid}`).then(res => {
      if (res.data.code === 0) {
        this.user = res.data.data;
      }
    });

    baseAxios
      .get(`/drawerillustration?uid=${this.$route.params.uid}`)
      .then(res => {
        if (res.data.code === 0) {
          this.drawerill = res.data.data.items;
        }
      });

    this.resizeIllustration();
  },
  methods: {
    onScroll(pos) {
      let fix = this.$refs.d_fix;
      let timer;
      this.scrollFlg = true;
      if (-pos.y >= 225) {
        this.show = true;
        fix ? (fix.style.opacity = 1) : "";
      } else if (-pos.y < 225) {
        if (fix && this.show) {
          fix.style.opacity = 0;
          this.show = false;
        }
      }
    },
    onScrollEnd() {
      this.scrollFlg = false;
    },
    focus() {
      baseAxios
        .get(
          `/attention?uid=${this.$route.params.uid}&type=${
            !this.user.feed.is_followed ? 1 : 0
          }`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.user.feed.is_followed = !this.user.feed.is_followed;
          }
        });
    },
    resizeIllustration() {
      const deviceWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
        this.img_width = (document.body.clientWidth - 30) / 3;
        this.containerWidth = this.img_width * 3 + 30;
    },
    mathFormatter() {
      return (225 - this.$refs.main.scrollTop) / 225;
    },
    showDetail(doc_id) {
      if(this.scrollFlg) return;
      this.$router.push(`/paint/drawer/${this.user.uid}/detail/${doc_id}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#drawer_detail
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 100
  background: #222
  .drawer_container_fixed
    position: fixed
    top: 1.066666rem
    left: 0
    height: 2rem
    width: 100%
    background: #333
    display: flex
    flex-flow: row nowrap
    align-items: center
    justify-content: flex-start
    transition: 0.3s all ease
    opacity: 0
    z-index: 101
    .drawer_circle
      width: 1.066666rem
      height: 1.066666rem
      border-radius: 50%
      border: 0.053333rem solid #fc6
      overflow: hidden
      margin: 0 auto
      > img
        width: 100%
    .userinfo
      display: flex
      flex-flow: column nowrap
      justify-content: center
      align-items: center
      margin: 0 auto
      .uname
      .grp
        margin-top: 0.266666rem
        &.grp_feed
          text-align: center
          width: 100%
        .level
          margin: 0 0.266666rem
          border-radius: 0.053333rem
          font-size: 0.32rem
          border: 1px solid #a068f1
          color: #a068f1
          font-weight: bold
          padding: 0.053333rem 0.08rem
        .feed
          margin: 0 0.266666rem
          display: inline-block
          width: 2.666666rem
          white-space: nowrap
          &.left
            text-align: left
          &.right
            text-align: right
    .focus_btn
      box-sizing: border-box
      margin: 0 auto
      width: 2.56rem
      height: 0.853333rem
      line-height: 0.853333rem
      text-align: center
      font-size: 0.373333
      color: #fff
      background-color: #23ade6
      border-radius: 0.106666rem
      cursor: pointer
    .unfocus_btn
      background-color: rgba(35, 173, 229, 0.1)
      border: solid 0.026666rem #23ade5
      color: #23ade5
  .main
    position: fixed
    top: 1.093333rem
    left: 0
    bottom: 0
    right: 0
    overflow: hidden
    .drawer_container
      position: relative
      height: 8rem
      overflow: hidden
      display: flex
      flex-direction: column
      flex-wrap: nowrap
      align-items: center
      justify-content: center
      .drawer_bg
        width: 100%
        height: 0
        padding-top: 8rem
        position: absolute
        top: 0
        left: 0
        overflow: hidden
        > img
          position: absolute
          top: -10px
          left: 0
          width: 100%
          z-index: -1
          filter: blur(15px)
      .drawer_circle
        width: 3.733333rem
        height: 3.733333rem
        border-radius: 50%
        border: 0.0533333rem solid #fc6
        overflow: hidden
        transform-origin: 50% 0
        > img
          width: 100%
      .userinfo
        width: 100%
        display: flex
        flex-flow: column nowrap
        justify-content: center
        align-items: center
        filter: blur(0)
        transform-origin: 50% 100%
        .uname
          margin-top: 10px
        .focus_btn
          box-sizing: border-box
          margin: 0 auto
          margin-top: 0.266666rem
          width: 2.56rem
          height: 0.853333rem
          line-height: 0.853333rem
          text-align: center
          font-size: 0.373333rem
          color: #fff
          background-color: #23ade6
          border-radius: 0.106666rem
          cursor: pointer
        .unfocus_btn
          background-color: rgba(35, 173, 229, 0.1)
          border: solid 0.026666rem #23ade5
          color: #23ade5
        .grp
          margin-top: 0.266666rem
          &.grp_feed
            text-align: center
            width: 100%
          .level
            margin: 0 0.266666rem
            border-radius: 0.053333rem
            font-size: 0.32rem
            border: 1px solid #a068f1
            color: #a068f1
            font-weight: bold
            padding: 0.053333rem 0.08rem
          .feed
            margin: 0 0.266666rem
            display: inline-block
            width: 2.66666rem
            white-space: nowrap
            &.left
              text-align: left
            &.right
              text-align: right
    .room
      width: 5.28rem
      height: 3.306666rem
      border-radius: 0.133333rem
      margin: 0.266666rem auto 0.266666rem
      overflow: hidden
      > a
        width: inherit
        > img
          width: inherit
    .illustration
      margin: 0 auto
      overflow: hidden
      .img_container
        float: left
        border-radius: 0.133333rem
        overflow: hidden
        margin: 5px
        .ill
          width: 100%
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
