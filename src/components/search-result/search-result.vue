<template>
    <div class="result">
      <m-header></m-header>
      <comic-list :list="list"></comic-list>
    </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import ComicList from 'base/comic-list/comic-list'
import {mapGetters} from 'vuex'

export default {
  components: {
    MHeader,
    ComicList
  },
  computed: {
    list () {
      return [this.comic]
    },
    ...mapGetters([
      'comic'
    ])
  },
  created () {
    if (!this.comic.id) {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .result
    position: fixed
    top: 50px
    left: 0
    width: 100%
    height: 100%
    background: $color-background
    z-index 500
</style>
