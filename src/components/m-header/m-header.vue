<template>
    <div class="m-header">
      <div class="mm-header">
        <div class="logo" v-if="name === '首页'"></div>
        <div class="back" v-if="name !== '首页'">
          <i class="icon-back" @click="back"></i>
          <span class="text">{{name}}</span>
        </div>
        <router-link to="/search" class="search" tag="div">
          <i class="icon-search"></i>
        </router-link>
        <div class="icon" @click="showMenu">
          <i class="icon-list"></i>
        </div>
      </div>
      <transition name="show">
        <div class="mm-menu" v-show="showFlag">
          <div class="menu-bg"></div>
          <div class="nav-menu">
            <ul class="menu-list">
              <li class="item">
                <router-link to="/index" tag="div">
                  <i class="icon home"></i>
                  <span class="text">首页</span>
                </router-link>
              </li>
              <li class="item">
                <router-link to="/bookcase/favorite" tag="div">
                  <i class="icon fav"></i>
                  <span class="text">收藏</span>
                </router-link>
              </li>
              <li class="item">
                <router-link to="/bookcase/history" tag="div">
                  <i class="icon history"></i>
                  <span class="text">历史</span>
                </router-link>
              </li>
              <li class="item">
                <router-link to="/classify" tag="div">
                  <i class="icon classify"></i>
                  <span class="text">分类</span>
                </router-link>
              </li>
              <li class="item">
                <router-link to="/rank" tag="div">
                  <i class="icon rank"></i>
                  <span class="text">排行</span>
                </router-link>
              </li>
              <li class="item">
                <router-link to="/time" tag="div">
                  <i class="icon time"></i>
                  <span class="text">追更</span>
                </router-link>
              </li>
            </ul>
            <router-link class="my-zone" to="/my-zone"></router-link>
          </div>
        </div>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import {component} from 'common/js/config'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      showFlag: false
    }
  },
  computed: {
    name () {
      const name = this.$route.path
      const num = name.lastIndexOf('/')
      return this.header(name.substr(num + 1))
    },
    ...mapGetters([
      'comic'
    ])
  },
  created () {
  },
  methods: {
    showMenu () {
      this.showFlag = !this.showFlag
    },
    back () {
      if (this.name === component.bookcase) {
        this.$router.push({
          path: '/index'
        })
      } else {
        this.$router.back()
      }
    },
    header (name) {
      switch (name) {
        case 'bookcase':
          return component.bookcase
        case 'index':
          return component.index
        case this.comic.id:
          return this.comic.title
        case 'favorite':
          return component.bookcase
        case 'search':
          return component.search
        case 'rank':
          return component.rank
        case 'history':
          return component.bookcase
        case 'time':
          return component.time
        case 'classify':
          return component.classify
      }
    }
  },
  watch: {
    '$route.path': function () {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.m-header
  .mm-header
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 50px
    background-color: #fff
    border-bottom: 1px solid rgba(0,0,0,.1)
    z-index:300
    .logo
      display: inline-block
      position: absolute
      width: 100px
      height: 25px
      top: 12px
      left: 5px
      background :url('logo.png') no-repeat
      background-size: 100px 25px
    .back
      position: absolute
      top: 15px
      left: 10px
      font-size :0
      .icon-back
        display :inline-block
        vertical-align :top
        width: 20px
        height: 20px
        background-size :20px 20px !important
        background-origin :center center
        background :url('back.png') no-repeat
      .text
        display :inline-block
        vertical-align :top
        margin-left: 5px
        font-size :20px
    .search
      position: absolute
      top: 0
      right: 60px
      .icon-search
        display :block
        padding: 15px
        font-size: 20px
        color: #f1794e
    .icon
      position: absolute
      top: 0
      right: 0
      .icon-list
        display :block
        padding: 15px
        font-size: 20px
        color: #f1794e
  .mm-menu
    position: fixed
    top: 50px
    left: 0
    bottom: 0
    right: 0
    z-index:200
    &.show-enter-active,&.show-leave-active
      transition : all .3s
      .nav-menu
        transition : all .3s
    &.show-enter,&.show-leave-to
      opacity: 0
      .nav-menu
        transform: translate3d(0,-100%,0)
    .menu-bg
      width: 100%
      height: 100%
      background-color: rgba(0,0,0,.5)
    .nav-menu
      position :absolute
      top: 0
      left: 0
      width: 100%
      background-color: #F5F5EE
      border-bottom: 5px solid #ff9a6a
      .menu-list
        display: flex
        flex-wrap :wrap
        text-align :center
        margin-top: 20px
        .item
          flex: 1 1 105px
          width: 105px
          height: 60px
          .icon
            display: block
            margin: 0 auto 5px
            width: 34px
            height: 34px
            // 为什么没有生效呢
            background-origin: center center !important
            background-size :34px 34px !important
            background-repeat :no-repeat
            &.home
              background :url('home.png')
            &.fav
              background :url('fav.png')
            &.classify
              background :url('classify.png')
            &.rank
              background :url('rank.png')
            &.history
              background :url('history.png')
            &.time
              background :url('time.png')
      .my-zone
        display: block
        width: 300px
        height: 50px
        margin: 10px auto
        background-size: 100% 100% !important
        background :url('my.png') no-repeat
</style>
