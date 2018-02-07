<template>
  <transition name="slide">
    <div id="paint_detail">
      <div v-if="detail && user && comments">
        <d-header :needsBack="true" title="作品详情"></d-header>
        <div class="illustration">
          <scroll class="scroll">
            <div class="panel">
              <div class="drawer">
                <div class="img_container">
                  <img :src="detail.user.head_url" alt="">
                </div>
                <div class="drawer_name">{{detail.user.name}}</div>
                <span class="drawer_level">UP {{user.user.master_level}}</span>
              </div>
              <div class="main">
                <div class="title">{{detail.item.title}}</div>
                <div class="desc" v-if="detail.item.description">{{detail.item.description}}</div>
                <div class="tags">
                  <span class="tag" :class="tag.link ? 'tag_link':''" v-for="tag in detail.item.tags" :key="tag.key">
                    <a :href="tag.link">{{tag.text}}</a>
                  </span>
                </div>
                <div class="imgs">
                  <img style="width: 100%;margin: 0 auto;display: block;margin-bottom:10px" v-for="pic in detail.item.pictures" v-lazy="pic.img_src" :key="pic.key" alt="">
                </div>
              </div>
              <c-title>热门评论</c-title>
              <div class="comments">
                <div class="comment_box" v-if="comments.hots || comments.hots.length !== 0" v-for="c in comments.hots" :key="c.key">
                  <div class="img_container">
                    <img :src="c.member.avatar" alt="">
                  </div>
                  <div class="content">
                    <div class="user_box">
                      <div class="uname">{{c.member.uname}}</div>
                      <div class="ulevel">L{{c.member.level_info.current_level}}</div>
                    </div>
                    <div class="comment">{{c.content.message}}</div>
                  </div>
                </div>
                <div v-if="!comments.hots || comments.hots.length === 0" class="noreply">暂无热门评论</div>
              </div>
              <c-title>评论</c-title>
              <div class="comments">
                <div class="comment_box" v-if="comments.replies || comments.replies.length !== 0" v-for="c in comments.replies" :key="c.key">
                  <div class="img_container">
                    <img :src="c.member.avatar" alt="">
                  </div>
                  <div class="content">
                    <div class="user_box">
                      <div class="uname">{{c.member.uname}}</div>
                      <div class="ulevel">L{{c.member.level_info.current_level}}</div>
                    </div>
                    <div class="comment">{{c.content.message}}</div>
                    <div class="replies" v-if="c.replies" v-for="r in c.replies" :key="r.key">
                      <div class="comment_box">
                        <div class="img_container">
                          <img :src="r.member.avatar" alt="">
                        </div>
                        <div class="content">
                          <div class="user_box">
                            <div class="uname">{{r.member.uname}}</div>
                            <div class="ulevel">L{{r.member.level_info.current_level}}</div>
                          </div>
                          <div class="comment">{{r.content.message}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!comments.replies || comments.replies.length === 0" class="noreply">暂无评论</div>
              </div>
            </div>
          </scroll>
        </div>
      </div>
      <loading v-else></loading>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import DHeader from "components/base/header/header";
import Loading from "components/base/loading/loading";
import Scroll from "components/base/scroll/scroll";
import CTitle from "components/base/c-title/c-title";
import { getComments } from "@/api/comment.js";
export default {
  components: {
    Loading,
    DHeader,
    Scroll,
    CTitle
  },
  data() {
    return {
      detail: undefined,
      user: undefined,
      comments: undefined
    };
  },
  created() {
    axios
      .get(`/api/illustration/detail?doc_id=${this.$route.params.id}`)
      .then(res => {
        if (res.data.code === 0) {
          this.detail = res.data.data;
        }
      });

    axios.get(`/api/user?uid=${this.$route.params.uid}`).then(res => {
      if (res.data.code === 0) {
        this.user = res.data.data;
      }
    });

    getComments(this.$route.params.id).then(res => {
      this.comments = res.data;
      console.log(this.comments);
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#paint_detail
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 100
  background: #222
  overflow-x: hidden
  .illustration
    position: fixed
    top: 41px
    left: 0
    bottom: 0
    right: 0
    .scroll
      height: 100%
      overflow: hidden
      .panel
        width: 100%
        padding: 5px
        box-sizing: border-box
      .main
        .title
          font-weight: bold
          padding: 5px
        .desc
          font-size: 12px
          padding: 5px
          color: #888
          line-height: 15px
        .tags
          width: 80%
          display: flex
          flex-flow: row wrap
          align-items: center
          font-size: 12px
          .tag
            padding: 2px 10px
            margin: 5px
            border-radius: 7px
            border: 1px solid #444
            background: #444
            color: #eee
          .tag_link
            border: 1px solid rgba(255, 148, 177, 0.4)
            background: transparent
            > a
              color: #ff94b1
      .drawer
        display: flex
        align-items: center
        .img_container
          width: 40px
          height: 40px
          border-radius: 50%
          border: 2px solid #fc6
          overflow: hidden
          > img
            width: 100%
        .drawer_name
          margin-left: 10px
        .drawer_level
          margin-left: 5px
          padding: 2px
          border-radius: 2px
          font-size: 12px
          border: 1px solid #5896de
          color: #5896de
          font-weight: bold
      .comments
        .noreply
          font-size: 12px
          text-align: center
          margin: 5px 0 5px
          color: #eee
        .comment_box
          display: flex
          flex-flow: row nowrap
          justify-content: flex-start
          align-items: flex-start
          margin: 10px 0 10px
          .img_container
            min-width: 40px
            min-height: 40px
            max-width: 40px
            max-height: 40px
            border-radius: 50%
            border: 2px solid #fc6
            overflow: hidden
            > img
              width: 100%
          .content
            display: flex
            flex-flow: column nowrap
            justify-content: flex-start
            align-items: space-around
            margin-left: 10px
            .user_box
              .uname
                display: inline-block
              .ulevel
                display: inline-block
                color: #9c7dd8
                margin-left: 5px
                font-size: 12px
                font-weight: bold
            .comment
              font-size: 12px
              color: #ddd
              margin-top: 5px
              line-height: 15px
            .replies
              .img_container
                min-width: 30px
                min-height: 30px
                max-width: 30px
                max-height: 30px
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
