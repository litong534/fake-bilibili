<template>
  <transition name="slide">
    <div id="drawer_detail">
      <d-header :needsBack="true" title="作品详情"></d-header>
      <div class="main" ref="main" @scroll="onScroll" v-if="drawerDetail && user && drawerill">
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
          <div>
            <div class="header">直播间: {{user.room.title}}</div>
            <div class="room">
              <a :href="user.room.room_link">
                <img :src="user.room.cover" alt="">
              </a>
            </div>
          </div>
          <div class="header">相簿</div>
          <div class="illustration" :style="{'width': `${containerWidth}px`}">
            <div class="img_container" @click="showDetail(item.doc_id)" :style="{'width':`${illWidth}px`,'height':`${illWidth}px`}" v-for="item in drawerill" :key="item.key">
              <img class="ill" :src="imgFormatter(item.pictures[0].img_src)" alt="">
            </div>
          </div>
        </div>
      </div>
      <loading v-else></loading>
      <router-view/>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import DHeader from "components/base/header/header";
import Loading from "components/base/loading/loading";
export default {
  components: {
    Loading,
    DHeader
  },
  data() {
    return {
      drawerDetail: undefined,
      user: undefined,
      drawerill: undefined,
      show: false
    };
  },
  created() {
    axios.get(`/api/drawerdetail?uid=${this.$route.params.uid}`).then(res => {
      if (res.data.code === 0) {
        this.drawerDetail = res.data.data;
      }
    });

    axios.get(`/api/user?uid=${this.$route.params.uid}`).then(res => {
      if (res.data.code === 0) {
        this.user = res.data.data;
      }
    });

    axios
      .get(`/api/drawerillustration?uid=${this.$route.params.uid}`)
      .then(res => {
        if (res.data.code === 0) {
          this.drawerill = res.data.data.items;
        }
      });

    this.resizeIllustration();
  },
  methods: {
    onScroll() {
      let circle = this.$refs.circle;
      let u = this.$refs.uinfo;
      let fix = this.$refs.d_fix;
      let timer;
      circle.style.transform = `translate3d(0,${
        this.$refs.main.scrollTop
      }px,0) scale(${this.mathFormatter()})`;
      circle.style.opacity = `${this.mathFormatter()}`;
      u.style.transform = `scale(${this.mathFormatter()})`;
      u.style.opacity = `${this.mathFormatter()}`;
      clearTimeout(timer);
      if (this.$refs.main.scrollTop >= 200) {
        this.show = true;
        fix ? (fix.style.opacity = 1) : "";
      } else if (this.$refs.main.scrollTop < 200) {
        if (fix && this.show) {
          fix.style.opacity = 0;
          timer = setTimeout(() => {
            this.show = false;
          });
        }
      }
    },
    focus() {
      axios.get("/api/attention").then(res => {
        if (res.data.code === 0) {
          this.user.feed.is_followed = !this.user.feed.is_followed;
        }
      });
    },
    resizeIllustration() {
      const deviceWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      this.illWidth = Math.floor((deviceWidth - 10) * 0.3);
      this.containerWidth = this.illWidth * 3 + 30;
    },
    imgFormatter(url) {
      return `${url}@400w_400h_1e_1c.webp`;
    },
    mathFormatter() {
      return (200 - this.$refs.main.scrollTop) / 200;
    },
    showDetail(doc_id) {
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
  overflow-x: hidden
  .main
    position: fixed
    top: 41px
    left: 0
    bottom: 0
    right: 0
    overflow-y: scroll
    .drawer_container
      position: relative
      height: 300px
      overflow: hidden
      display: flex
      flex-flow: column nowrap
      align-items: center
      justify-content: center
      .drawer_bg
        width: 100%
        height: 0
        padding-top: 300px
        position: absolute
        overflow: hidden
        > img
          position: absolute
          top: 0
          left: 0
          width: 100%
          filter: blur(15px)
      .drawer_circle
        width: 140px
        height: 140px
        border-radius: 50%
        border: 2px solid #fc6
        overflow: hidden
        filter: blur(0)
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
          margin-top: 10px
          width: 96px
          height: 32px
          line-height: 32px
          text-align: center
          font-size: 14px
          color: #fff
          background-color: #23ade6
          border-radius: 4px
          cursor: pointer
        .unfocus_btn
          background-color: rgba(35, 173, 229, 0.1)
          border: solid 1px #23ade5
          color: #23ade5
        .grp
          margin-top: 10px
          &.grp_feed
            text-align: center
            width: 100%
          .level
            margin: 0 10px
            border-radius: 2px
            font-size: 12px
            border: 1px solid #a068f1
            color: #a068f1
            font-weight: bold
          .feed
            margin: 0 10px
            display: inline-block
            width: 100px
            white-space: nowrap
            &.left
              text-align: left
            &.right
              text-align: right
    .drawer_container_fixed
      position: fixed
      top: 40px
      left: 0
      height: 100px
      width: 100%
      background: #333
      display: flex
      flex-flow: row nowrap
      align-items: center
      justify-content: flex-start
      transition: 0.3s all ease
      opacity: 0
      .drawer_circle
        width: 40px
        height: 40px
        border-radius: 50%
        border: 2px solid #fc6
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
          margin-top: 10px
        .grp
          margin-top: 10px
          &.grp_feed
            text-align: center
            width: 100%
          .level
            margin: 0 10px
            border-radius: 2px
            font-size: 12px
            border: 1px solid #a068f1
            color: #a068f1
            font-weight: bold
          .feed
            margin: 0 10px
            display: inline-block
            width: 100px
            white-space: nowrap
            &.left
              text-align: left
            &.right
              text-align: right
      .focus_btn
        box-sizing: border-box
        margin: 0 auto
        margin-top: 10px
        width: 96px
        height: 32px
        line-height: 32px
        text-align: center
        font-size: 14px
        color: #fff
        background-color: #23ade6
        border-radius: 4px
        cursor: pointer
      .unfocus_btn
        background-color: rgba(35, 173, 229, 0.1)
        border: solid 1px #23ade5
        color: #23ade5
    .header
      header()
    .room
      width: 198px
      height: 124px
      border-radius: 5px
      margin: 10px auto 10px
      overflow: hidden
      > a
        width: inherit
        > img
          width: inherit
    .header
      header()
    .illustration
      margin: 0 auto
      overflow: hidden
      .img_container
        float: left
        border-radius: 5px
        overflow: hidden
        margin: 5px
        .ill
          width: 100%
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
