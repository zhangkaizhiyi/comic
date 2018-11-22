<template>
    <div class="time-wrapper">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">一</mt-tab-item>
        <mt-tab-item id="2">二</mt-tab-item>
        <mt-tab-item id="3">三</mt-tab-item>
        <mt-tab-item id="4">四</mt-tab-item>
        <mt-tab-item id="5">五</mt-tab-item>
        <mt-tab-item id="6">六</mt-tab-item>
        <mt-tab-item id="0">日</mt-tab-item>
      </mt-navbar>
      <comic-list :list="list"
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
      </comic-list>
      <mt-spinner type="snake" v-if="!flag" color="orange" class="hold"></mt-spinner>
      <p v-if="flag" class="bottom">主人，人家真的没有了啊</p>
    </div>
</template>

<script type="text/ecmascript-6">
import ComicList from 'base/comic-list/comic-list'
import {getTime} from 'api/time'

export default {
  data () {
    return {
      selected: '1',
      page: 1,
      list: [],
      loading: false,
      flag: false
    }
  },
  created () {
    this._getTime()
  },
  methods: {
    _getTime () {
      getTime(this.selected, this.page).then((res) => {
        if (!res.length) {
          this.flag = true
        }
        this.list = this.list.concat(res)
      })
    },
    loadMore () {
      if (this.flag) {
        this.loading = true
        return
      }
      this.page++
      setTimeout(() => {
        this._getTime()
      }, 1000)
    }
  },
  watch: {
    selected () {
      this.flag = false
      this.page = 1
      this.list = []
      this.loading = false
      this._getTime()
    }
  },
  components: {
    ComicList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .time-wrapper
    position: relative
    top: 50px
    .mint-navbar
      .is-selected
        color: orange
        border-bottom: 3px solid orange
    .mint-spinner-snake
      margin: 20px auto
    .bottom
      margin: 20px auto
      text-align: center
</style>
