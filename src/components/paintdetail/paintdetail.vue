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
                  <img style="width: 100%;margin: 0 auto;display: block;margin-bottom:0.266666rem" v-for="pic in detail.item.pictures" v-lazy="pic.img_src" :key="pic.key" alt="">
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
      <loading v-else :is404="is404"></loading>
    </div>
  </transition>
</template>

<script>
import DHeader from 'components/base/header/header'
import Loading from 'components/base/loading/loading'
import Scroll from 'components/base/scroll/scroll'
import CTitle from 'components/base/c-title/c-title'
import { getComments } from '@/api/comment.js'
import { baseAxios } from '@/api/common'
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
      comments: undefined,
      is404: false
    }
  },
  created() {
    baseAxios
      .get(`/illustration/detail?doc_id=${this.$route.params.id}`)
      .then(res => {
        if (res.data.code === 0) {
          this.detail = res.data.data
        } else if (res.data.code === 110001) {
          this.is404 = true
        }
      })

    baseAxios.get(`/user?uid=${this.$route.params.uid}`).then(res => {
      if (res.data.code === 0) {
        this.user = res.data.data
      }
    })

    getComments(this.$route.params.id).then(res => {
      this.comments = res.data
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index'
#paint_detail
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 102
  background: #222
  .illustration
    position: fixed
    top: 1.093333rem
    left: 0
    bottom: 0
    right: 0
    .scroll
      height: 100%
      overflow: hidden
      .panel
        width: 100%
        padding: 0.133333rem
        box-sizing: border-box
      .main
        .title
          font-weight: bold
          padding: 0.133333rem
        .desc
          font-size: 0.32rem
          padding: 0.133333rem
          color: #888
          line-height: 0.4rem
        .tags
          width: 80%
          display: flex
          flex-flow: row wrap
          align-items: center
          font-size: 0.32rem
          .tag
            padding: 0.093333rem 0.266666rem 0.043333rem
            margin: 0.133333rem
            border-radius: 0.386666rem
            border: 0.026666rem solid #444
            box-sizing: border-box
            line-height: 0.333333rem
            background: #444
            color: #eee
          .tag_link
            border: 0.026666rem solid rgba(255, 148, 177, 0.4)
            background: transparent
            > a
              color: #ff94b1
      .drawer
        display: flex
        align-items: center
        .img_container
          width: 1.066666rem
          height: 1.066666rem
          border-radius: 50%
          border: 0.053333rem solid #fc6
          overflow: hidden
          > img
            width: 100%
        .drawer_name
          margin-left: 0.266666rem
        .drawer_level
          margin-left: 0.133333rem
          padding: 0.053333rem
          border-radius: 0.053333rem
          font-size: 0.32rem
          border: 0.026666rem solid #5896de
          color: #5896de
          font-weight: bold
      .comments
        .noreply
          font-size: 0.32rem
          text-align: center
          margin: 0.133333rem 0 0.133333rem
          color: #eee
        .comment_box
          display: flex
          flex-flow: row nowrap
          justify-content: flex-start
          align-items: flex-start
          margin: 0.266666rem 0 0.266666rem
          word-wrap: break-word
          .img_container
            min-width: 1.066666rem
            min-height: 1.066666rem
            max-width: 1.066666rem
            max-height: 1.066666rem
            border-radius: 50%
            border: 0.053333rem solid #fc6
            overflow: hidden
            > img
              width: 100%
          .content
            display: flex
            flex-flow: column nowrap
            justify-content: flex-start
            align-items: space-around
            margin-left: 0.266666rem
            .user_box
              .uname
                display: inline-block
              .ulevel
                display: inline-block
                color: #9c7dd8
                margin-left: 0.133333rem
                font-size: 0.32rem
                font-weight: bold
            .comment
              font-size: 0.32rem
              color: #ddd
              margin-top: 0.133333rem
              line-height: 0.4rem
            .replies
              .img_container
                min-width: 0.8rem
                min-height: 0.8rem
                max-width: 0.8rem
                max-height: 0.8rem
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
