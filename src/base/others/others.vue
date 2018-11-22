<template>
    <div class="others">
      <p class="title" v-if="list.length">{{text}}</p>
      <ul class="others-wrapper" v-if="list.length">
        <li v-for="item in list" :key="item.id" class="others-item">
          <div class="cover">
            <img :src="item.cover_url" >
          </div>
          <div class="info">
            <div class="title">{{item.title}}</div>
            <span class="desc">{{item.short_desc}}</span>
          </div>
        </li>
      </ul>
      <div class="hold" v-if="!list.length">
        <h1 class="head">正在载入中</h1>
        <mt-spinner type="fading-circle" :size="40"></mt-spinner>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getOthers} from 'api/others'

export default {
  props: {
    num: {
      type: Number,
      default: 3
    },
    id: {
      type: String,
      default: '634243'
    },
    text: {
      type: String,
      default: '大家都在看'
    }
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this._getOthers()
  },
  methods: {
    _getOthers () {
      getOthers().then((res) => {
        this.list = res.list
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .others
    width: 100%
    min-height: 200px
    padding: 15px 0
    background-color :#fff
    .title
      margin-top: 10px
      margin-left: 15px
    .others-wrapper
      display :flex
      padding :15px
      justify-content: space-between
      .others-item
        width: 105px
        background-color :#F5F5EE
        border: 1px solid rgba(0,0,0,.1)
        .cover
          width: 100%
          height: 140px
          img
            width: 100%
            height: 100%
        .info
          padding: 5px
          text-align :center
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
          .title
            margin-bottom: 5px
            font-size: 14px
            color: black
            font-weight: 500
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .desc
            margin-bottom: 5px
            font-size: 12px
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
    .hold
      width: 300px
      margin: 40px auto
      text-align: center
      .mint-spinner-fading-circle
        margin: 20px auto
</style>
