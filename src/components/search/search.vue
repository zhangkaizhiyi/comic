<template>
    <div class="search-wrapper">
      <div class="header" ref="header">
        <span class="back" @click="back">
          <i class="icon-rewind"></i>
        </span>
        <div class="search-box">
          <div class="search-inner-box" :class="showCls">
            <i class="icon-search" ></i>
            <transition name="span">
              <span v-show="!move&&!query">漫画名|作者</span>
            </transition>
          </div>
          <div class="search-outer-box">
            <div class="pad"></div>
            <input type="search" class="input" v-model="query" @focus="focus" @blur="blur">
            <i class="icon-cancel-circle" v-show="move" @click="clear"></i>
          </div>
        </div>
        <span class="search-btn">搜索</span>
      </div >
      <ul class="result-warpper" v-show="result.length&&query">
        <li v-for="item in result" :key="item.id" class="result-item" @click="resultTo(item)">{{item.title}}</li>
      </ul>
      <div class="title">
        <span class="title-hot">大家都在搜</span>
      </div>
      <ul class="hot-list">
        <li v-for="item in hot" :key="item.id" class="list-item" @click="tip(item)">{{item.name}}</li>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import {getSearchHot, getSearch} from 'api/search'
import {mapMutations} from 'vuex'
import {getDetail} from 'api/detail'

export default {
  data () {
    return {
      query: '',
      move: false,
      hot: [],
      result: []
    }
  },
  created () {
    this._getSearchHot()
  },
  computed: {
    showCls () {
      return !this.move && !this.query ? '' : 'move'
    }
  },
  methods: {
    resultTo (item) {
      this.$router.push({
        path: `/search/${item.id}`
      })
      getDetail(item.id).then((res) => {
        this.setComic(res)
      })
    },
    _getSearch () {
      getSearch(this.query).then((res) => {
        this.result = res.data
      })
    },
    _getSearchHot () {
      getSearchHot().then((res) => {
        this.hot = res
      })
    },
    back () {
      this.$router.back()
    },
    clear () {
      this.query = ''
    },
    focus () {
      this.move = true
    },
    blur () {
      this.move = false
    },
    tip (item) {
      this.query = item.name
    },
    ...mapMutations({
      setComic: 'SET_COMIC'
    })
  },
  watch: {
    query (val) {
      if (val) {
        this._getSearch()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-wrapper
    position: relative
    top: 50px
    .header
      position: fixed
      top: 0
      left: 0
      width: 100%
      z-index :400
      display: flex
      // 垂直居中这么简单的
      align-items center
      height: 50px
      background-color :$color-theme
      .back
        .icon-rewind
          color: #fff
          font-size: 40px
          line-height: 50px
      .search-box
        flex: 1
        // 这么做事为了垂直居中
        display: flex
        align-items: center
        position: relative
        height: 35px
        box-sizing: border-box
        overflow: hidden
        background-color: white
        border-radius: 3px
        .search-inner-box
          width: 100%
          // 又是垂直居中啊
          display: flex
          align-items: center
          justify-content center
          transition all 1s
          .icon-search
            margin-left: 10px
            margin-right: 10px
            transition all 1s
        .move
          .icon-search
            transform translate3d(-130px,0,0)
        .search-outer-box
          position: absolute
          display: flex
          align-items: center
          z-index: 1
          top: 0
          left: 0
          width: 100%
          height: 100%
          .pad
            width: 30px
          .input
            flex: 1
            display: block
            height: 30px
            line-height: 30px
            background-color: transparent
            outline: none
            color: #535252
          .icon-cancel-circle
            display: block
            margin-right: 5px
      .search-btn
        padding: 10px
        color: white
    .result-warpper
      padding: 0 15px
      background-color :#fff
      .result-item
        text-indent 10px
        line-height: 40px
        border-bottom: 1px solid rgba(0,0,0,.3)
        &:last-child
          border-bottom none
    .title
      margin-top: 15px
      margin-left: 15px
      .title-hot
        padding: 5px
        border-radius 3px
        background-color: rgba(0,0,0,.1)
    .hot-list
      border-top: 2px solid rgba(0,0,0,.3)
      margin:15px
      padding-top: 10px
      display: flex
      flex-wrap wrap
      .list-item
        margin-right: 10px
        margin-bottom: 10px
        height: 40px
        background-color #fff
        border-radius 20px
        line-height: 40px
        padding: 0 10px
        border: 1px solid rgba(0,0,0,.1)
</style>
