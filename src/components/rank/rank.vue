<template>
    <div class="rank-wrapper">
      <mt-navbar v-model="selected">
        <mt-tab-item id="upt">更新</mt-tab-item>
        <mt-tab-item id="pay">畅销</mt-tab-item>
        <mt-tab-item id="pgv">人气</mt-tab-item>
        <mt-tab-item id="mt">月票</mt-tab-item>
      </mt-navbar>
      <div class="top3-box">
        <div v-html="item.html" v-for="item in top" :key="item.id" class="top3-box-item"></div>
      </div>
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore">
        <ul class="rank-ul">
          <li v-for="(item, index) in li" :key="item.id"  class="rank-li" @click="toDetail(item)">
            <div v-html="item.html"></div>
            <i class="index" v-text="inDex(index+4)"></i>
          </li>
        </ul>
      </mt-loadmore>
    </div>
</template>

<script type="text/ecmascript-6">
import {getRank} from 'api/rank'
import {mapMutations} from 'vuex'

export default {
  computed: {
  },
  data () {
    return {
      top: [],
      li: [],
      page: 1,
      allLoaded: false,
      selected: 'pay'
    }
  },
  created () {
    this._getRank()
  },
  methods: {
    toDetail (item) {
      this.$router.push({
        path: `/comic/${item.id}`,
        params: {
          id: item.id,
          name: item.title
        }
      })
      this.setComic(item)
    },
    inDex (num) {
      if (num < 10) {
        return '0' + num
      } else {
        return num
      }
    },
    _getRank () {
      getRank(this.selected, this.page).then((res) => {
        this.top = this.top.concat(res.top)
        this.li = this.li.concat(res.li)
        console.log(this.li)
      })
    },
    loadBottom () {
      this.page++
      this._getRank()
      this.$refs.loadmore.onBottomLoaded()
    },
    ...mapMutations({
      setComic: 'SET_COMIC'
    })
  },
  watch: {
    selected () {
      this.page = 1
      this.top = []
      this.li = []
      this._getRank()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rank-wrapper
    position :relative
    top: 50px
    .top3-box
      margin-top: 20px
      display :flex
      justify-content :space-around
      .top3-box-item
        .a
          display :block
          overflow :hidden
          text-align :center
          img
            width: 100%
          .comic-title
            display :block
            font-size :20px
            margin-top: 5px
            white-space:nowrap
            overflow:hidden
            color:white
            text-overflow:ellipsis
          .comic-update
            display :block
            margin-top: 3px
            margin-bottom: 8px
            font-size:14px
            color:white
            white-space:nowrap
            overflow:hidden
            text-overflow:ellipsis
      .top3-box-item:nth-child(odd)
        position :relative
        top: 24px
        width: 87px
        .a
          background: #ffa755
      .top3-box-item:nth-child(even)
        width: 105px
        .a
          background: #e86a3e
    .rank-ul
      margin-top: 20px
      padding:5px
      // 每一行的内容
      .rank-li
        position: relative
        .a
          display: flex
          padding:10px
          border-radius:5px
          margin-bottom: 10px
          background-color :white
          .comic-cover
            flex:0 0 70px
            width: 70px
            margin-right: 10px
            img
              width: 100%
          .comic-info
            flex: 1
            display:flex
            flex-direction: column
            justify-content: center
            font-size: 14px
            font-weight: 200
            overflow:hidden
            .comic-title
              margin-top: 5px
              font-size :18px
              font-weight: 700
              color:black
            .comic-update
              margin-top: 5px
            .comic-tag
              margin-top: 5px
            .comic-desc
              display :block
              margin-top: 5px
              white-space:nowrap
              overflow:hidden
              text-overflow:ellipsis
        .index
          position:absolute
          top: 10px
          right: 10px
          font-weight: 700
          font-size: 30px
</style>
