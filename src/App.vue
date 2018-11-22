<template>
  <div id="app">
    <m-header ></m-header>
    <span v-show="show" class="mt-button" @click="backToTop">
      <i class="icon-cheveron-up"></i>
    </span>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    MHeader
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        this.show = true
      } else {
        this.show = false
      }
    },
    backToTop () {
      let scrollToptimer
      clearInterval(scrollToptimer)
      scrollToptimer = setInterval(function () {
        let top = document.body.scrollTop || document.documentElement.scrollTop
        let speed = top / 4
        if (document.body.scrollTop !== 0) {
          document.body.scrollTop -= speed
        } else {
          document.documentElement.scrollTop -= speed
        }
        if (top === 0) {
          clearInterval(scrollToptimer)
        }
      }, 30)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mt-button
    position: fixed
    display: block
    width: 40px
    height: 40px
    font-size: 40px
    bottom: 100px
    right: 30px
    background-color :rgba(255,255,255,.8)
    border: 1px solid #ccc
    z-index: 300
    border-radius: 5px
</style>
