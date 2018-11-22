<template>
    <div class="index">
      <router-view></router-view>
      <div class="slider">
        <mt-swipe :auto="4000" >
          <mt-swipe-item v-for="item in slider" :key="item.id">
            <a :href="item.href">
              <img :src="item.src" width="100%" height="100%">
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <tab></tab>
      <!--无量推荐-->
      <div class="block recommend" >
        <div class="header">
          <div class="recommend-pic pic"></div>
          <div class="more" @click="more"></div>
        </div>
        <comic-block :list="recommend"></comic-block>
      </div>
      <!--每日一推-->
      <div class="recommendDay block">
        <div class="header">
          <div class="recommendDay-pic pic"></div>
          <div class="more"></div>
        </div>
        <div class="recommendDay-content">
          <div class="cover">
            <img :src="recommendDay.cover" >
          </div>
          <div class="info">
            <span class="title">{{recommendDay.name}}</span>
            <span class="author">{{recommendDay.author}}</span>
          </div>
        </div>
      </div>
      <!--今日我更新-->
      <div class="update block">
        <div class="header">
          <div class="update-header pic"></div>
          <div class="more"></div>
        </div>
        <div class="content">
          <div class="aside"></div>
          <comic-list :list="update" bgc="#F5F5EE"></comic-list>
        </div>
      </div>
      <!--日漫经典-->
      <div class="classic block">
        <div class="header">
          <div class="classic-header pic"></div>
          <div class="more"></div>
        </div>
        <comic-block :list="classic"></comic-block>
      </div>
      <!--每日更新-->
      <div class="new block">
        <div class="header">
          <div class="new-header pic"></div>
          <div class="more"></div>
        </div>
        <comic-block :list="newComic"></comic-block>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getIndex, getRecommend} from 'api/index'
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import ComicBlock from 'base/comic-block/comic-block'
import ComicList from 'base/comic-list/comic-list'

export default {
  data () {
    return {
      showLogo: true,
      slider: [],
      classic: [],
      update: [],
      recommendDay: {},
      newComic: [],
      recommend: []
    }
  },
  components: {
    MHeader,
    Tab,
    ComicBlock,
    ComicList
  },
  created () {
    this._getIndex()
    this._getRecommend()
  },
  methods: {
    // 路由跳转
    more () {
      this.$router.push({
        path: '/index/more'
      })
    },
    // 无量推荐
    _getRecommend () {
      getRecommend().then((res) => {
        res.list.forEach((item) => {
          let comic = {}
          comic.id = item.id
          comic.desc = item.short_desc
          comic.name = item.title
          comic.cover = item.cover_url
          this.recommend.push(comic)
        })
        console.log(this.recommend)
      })
    },
    _getIndex () {
      getIndex().then((res) => {
        this.slider = res.slider
        this.classic = res.classic
        this.update = res.update
        this.recommendDay = res.recommend
        this.newComic = res.new
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    position: relative
    top: 50px
    /*轮播图*/
    .slider
      width: 100%
      height: 218px
      .mint-swipe
        .mint-swipe-indicators
          left: 76%
          bottom: 20px
          .mint-swipe-indicator
            background: #fff
            opacity .8
            transition all 0.4s
            &.is-active
              width: 20px
              border-radius 5px
              background-color: $color-theme
    /*通用设置*/
    .block
      .header
        display flex
        justify-content space-between
        padding 10px
        .pic
          width: 150px
          height: 40px
          background-size: 410px 350px
          background-image: url('sc_img_index.png')
          background-repeat no-repeat
        .more
          margin-top: 10px
          width: 60px
          height: 25px
          background-size: 410px 350px
          background-image: url('sc_img_index.png')
          background-repeat no-repeat
          background-position  -340px -45px
    /*无量推荐*/
    .recommend
      position: relative
      top: -20px
      .header
        .recommend-pic
          background-position  -100px 0
    /*每日一推*/
    .recommendDay
      .header
        .recommendDay-pic
          background-position  -255px 0
      .recommendDay-content
        position: relative
        background-color: #fff
        border-radius 5px
        width: 92%
        margin-left: 4%
        img
          border-radius 5px
          width: 100%
      .info
        padding: 10px
        .title
          color $color-text-d
          font-weight: 700
        .author
          position: absolute
          right: 10px
          bottom: 10px
          font-size $size-text-s
    /*今日我更新*/
    .update
      .header
        .update-header
          background-position  -100px -136px
      .content
        display:flex
        padding: 5px
        justify-content: space-between
        background-color: #fff
        .aside
          width: 100px
          height: 300px
          background: url('sc_img_index.png') no-repeat 0 0
          background-size: 410px 350px
    /*日漫经典*/
    .classic
      .header
        .classic-header
          background-position  -100px -220px
    /*每日更新*/
    .new
      .header
        .new-header
          background-position  -100px -270px
</style>
