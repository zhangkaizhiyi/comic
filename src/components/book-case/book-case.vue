<template>
  <transition name="fa" enter-active-class="animated bounceIn"
              leave-active-class="animated bounceIn"
              :duration="200">
    <div class="book-case">
      <div class="bookcase-tab">
        <router-link tag="div" to="/bookcase/favorite">收藏</router-link>
        <router-link tag="div" to="/bookcase/history">历史</router-link>
        <span class="revise">
          <i class="icon-quill"></i>
        </span>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .book-case
    position: relative
    width: 100%
    height: 100%
    top: 50px
    left: 0
    .bookcase-tab
      position: relative
      z-index: 20
      position: fixed
      padding: 0 60px
      top: 50px
      width: 100%
      display :flex
      justify-content :space-around
      height: 40px
      line-height: 40px
      background-color: #fff
      border-bottom: 1px solid rgba(0,0,0,.1)
      .router-link-active
        border-bottom: 3px solid orange
      .revise
        position :absolute
        right: 20px
        top: 0
        .icon-quill
          color: orange
</style>
