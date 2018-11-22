<template>
    <div class="recommend">
      <div class="header">
        <div class="icon"></div>
        <div class="more"></div>
      </div>
      <ul class="recommend-content">
        <li v-for="item in list" :key="item.id" class="item">
          <a >
            <div class="cover">
              <img :src="item.cover_url" width="100%">
            </div>
            <div class="content">
              <h1 class="title">{{item.title}}</h1>
              <p class="desc">{{item.short_desc}}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend} from 'api'
import {ERR_OK} from 'api/config'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.status === ERR_OK) {
          this.list = res.list
          console.log(this.list)
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    .header
      width: 100%
      height: 46px
      .icon
        display:inline-block
        width: 160px
        height: 30px
        margin-left: 20px
        background :url('sc_img_index_03.png') no-repeat
        background-size :160px 30px
    .recommend-content
      display :flex
      justify-content :space-around
      flex-wrap wrap
      .item
        flex: 0 0 105px
        width: 105px
        text-align :center
        margin-bottom: 10px
        background-color: white
        .content
          .title
            margin-top: 5px
            font-size: 18px
            font-weight: 700
            color: rgb(40,40,40)
            overflow :hidden
            white-space: nowrap
            text-overflow: ellipsis
          .desc
            margin-top: 5px
            margin-bottom: 10px
            overflow :hidden
            white-space: nowrap
            text-overflow: ellipsis
</style>
