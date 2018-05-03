<template>
  <transition name="search">
    <div id="search">
      <c-header title="搜索" :needsBack="true" :needsSearch="false"></c-header>
      <div class="search-input">
        <img src="~@/assets/search.png" style="margin-left:10px" width="25" alt="">
        <div class="input-container">
          <input class="input-area" type="text" @keypress="search($event)" :value="decodeURI(keyword)" ref="search_input">
        </div>
      </div>
      <scroll class="scroll">
        <div>
          <div class="history">
            <div class="history-title">历史搜索记录</div>
            <div class="history-tags">
              <div class="tag" v-for="(item, index) in tagItem" :key="index" @click="searchByHistoryTag(item)">{{item}}</div>
            </div>
          </div>
          <div class="loading-notice" v-if="status === 'PENDING'">加载中</div>
          <div v-if="searchData" class="search-results">
            <card v-for="(item, index) in searchData.result" :illdata="item" :key="index"></card>
          </div>
          <div class="pagination" v-if="searchData">
            <div class="pages" ref="prev" @click="searchPrevPage($event)">上一页</div>
            <div class="pages" ref="next" @click="searchNextPage($event)">下一页</div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { baseAxios } from '@/api/common'
import { STATUS, saveHistoryToLocalStorage, getHistoryFromLocalStorage } from 'common/js/utils'
import { addClass, removeClass, hasClass } from 'common/js/dom'
import Card from 'components/base/search/card'
import CHeader from 'components/base/header/header'
import Scroll from 'components/base/scroll/scroll'
export default {
  components: {
    CHeader,
    Card,
    Scroll
  },
  created() {
    this.keyword = this.$route.query.keyword || ''
    this.page = this.$route.query.page * 1 || 1
    if (this.keyword) {
      this.tagItem = saveHistoryToLocalStorage('history', this.keyword)
    } else {
      this.tagItem = getHistoryFromLocalStorage('history')
    }
    this.searchByKeyword()
  },
  mounted() {},
  data() {
    return {
      tagItem: () => [],
      status: STATUS.WAITING,
      searchData: undefined,
      keyword: '',
      page: 1
    }
  },
  methods: {
    search(e) {
      if (e.keyCode === 13) {
        this.keyword = encodeURI(this.$refs.search_input.value)
        this.$router.replace(
          `/search?keyword=${this.keyword}&page=${this.page}`
        )
      }
    },
    searchByKeyword() {
      if (!this.keyword) return
      this.status = STATUS.PENDING
      this.searchData = undefined
      baseAxios
        .get(`/search?keyword=${this.keyword}&page=${this.page}`)
        .then(res => {
          this.searchData = res.data
          this.status = STATUS.RESOLVED
        })
        .then(() => {
          // this.tagItem = saveHistoryToLocalStorage('history', this.keyword)
          this.setPaginationStatus()
        })
    },
    setPaginationStatus() {
      if (this.page === 1) {
        addClass(this.$refs.prev, 'disable')
      } else {
        removeClass(this.$refs.prev, 'disable')
      }
      if (
        this.searchData &&
        this.searchData.numPages === this.searchData.page
      ) {
        addClass(this.$refs.next, 'disable')
      } else {
        removeClass(this.$refs.next, 'disable')
      }
    },
    searchNextPage(e) {
      if (!hasClass(e.target, 'disable')) {
        this.$router.replace(
          `/search?keyword=${this.keyword}&page=${++this.page}`
        )
      }
    },
    searchPrevPage(e) {
      if (!hasClass(e.target, 'disable')) {
        this.$router.replace(
          `/search?keyword=${this.keyword}&page=${--this.page}`
        )
      }
    },
    searchByHistoryTag(tag) {
      if (tag !== this.keyword) {
        this.page = 1
        this.keyword = encodeURI(tag)
        this.$router.replace(
          `/search?keyword=${this.keyword}&page=${this.page}`
        )
      }
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      let { keyword } = newRoute.query
      let { keyword: oldkeyword } = oldRoute.query
      if (!keyword) return
      if (!oldkeyword || keyword !== oldkeyword) {
        this.page = 1
        this.keyword = keyword
        this.tagItem = saveHistoryToLocalStorage('history', this.keyword)
      }
      this.searchByKeyword()
    }
  }
}
</script>

<style lang="stylus" scoped>
#search
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  flex-flow: column nowrap
  z-index: 100
  background: #222
  .scroll
    position: fixed
    bottom: 0
    left: 0
    right: 0
    top: 2.666666rem
    overflow: hidden
    .loading-notice
      text-align: center
      background: rgba(255, 255, 255, 0.2)
      padding: 0.26rem 0
      width: 80%
      margin: 0.26rem auto 0
      box-sizing: border-box
      border-radius: 0.233333rem
      border: 0.0266667rem solid #fff
    .pagination
      width: 100%
      display: flex
      flex-flow: row nowrap
      justify-content: center
      align-items: space-around
      padding: 0 0 0.233333rem 0
      .pages
        width: 40%
        padding: 0.26rem 0
        margin: 0 0.26rem 0
        text-align: center
        background: rgba(255, 255, 255, 0.2)
        box-sizing: border-box
        border-radius: 0.233333rem
        border: 0.026rem solid #fff
      .disable
        color: #666
        border: 0.026rem solid #666
        background: transparent
    .search-results
      padding: 0.266667rem
    .history
      font-size: 0.346667rem
      color: #fff
      .history-title
        padding-left: 0.266667rem
      .history-tags
        padding: 0.266667rem
        box-sizing: border-box
        display: flex
        flex-flow: row wrap
        justify-content: flex-start
        align-items: flex-start
        .tag
          margin-top: 0.266667rem
          margin-right: 0.266667rem
          padding: 0.133333rem 0.266667rem
          border-radius: 0.233333rem
          background: #999
  .search-input
    margin: 0 0.266667rem
    box-sizing: border-box
    margin-top: 0.4rem
    margin-bottom: 0.4rem
    background: #666
    height: 0.8rem
    border-radius: 0.4rem
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    .input-container
      flex: 1
      .input-area
        width: 88%
        margin-left: 10px
        color: #fff
        background: #666
.search-enter-active, .search-leave-active
  transition: all 0.3s
.search-enter, .search-leave-to
  transform: translate3d(100%, 0, 0)
</style>
