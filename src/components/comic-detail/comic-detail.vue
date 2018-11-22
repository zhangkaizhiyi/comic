<template>
    <div class="comic-detail" >
      <div class="comic-banner">
        <div class="bg" :style="bgImage">
        </div>
        <div class="info">
          <div class="cover">
            <img :src="info.cover" width="130px">
          </div>
          <div class="info-info">
            <div class="title">
              <span class="name">{{info.title}}</span>
              <span class="grader">{{info.grade}}</span>
            </div>
            <div class="tags">
              <span v-for="item in info.tags" :key="item">{{item}}</span>
            </div>
            <p class="author">{{info.author}}</p>
            <p class="hot">人气:
              <span class="num"> {{ info.hot}}</span>
            </p>
            <p class="mt">月票:
              <span class="num">
                {{ ticket}}
              </span>
            </p>
          </div>
        </div>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">详情</mt-tab-item>
        <mt-tab-item id="2">目录</mt-tab-item>
        <mt-tab-item id="3">评论</mt-tab-item>
      </mt-navbar>
      <!--tab内容区域-->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div id="desc1">
            <div class="desc-info">
              {{comic.desc}}
            </div>
            <others :id="comic.id"></others>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="menu">
            <div class="title">
              <span class="date">{{date}}</span>
              <span class="update">{{comic.update}}</span>
            </div>
            <ul class="menu-list">
              <li v-for="n in num" :key="n" v-if="n<10" class="list-item">{{num - n + 1}}</li>
            </ul>
            <div class="more" v-if="num > 9">大人，查看更多目录</div>
          </div>
          <others :id="comic.id"></others>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="comment">
            <ul class="comment-ul"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
              <li v-for="item in comment" :key="item.id" class="comment-li">
                <div class="user-head">
                  <div class="user-pic">
                    <img :src="item.qq_head" >
                  </div>
                  <div class="user-info">
                    <p class="user-name">{{item.nick_name}}</p>
                    <p class="user-time">{{time(item.pub_time)}}</p>
                  </div>
                  <div class="icon" @click="toggleThumb(item)">
                    <i class="icon-thumb-up" :class="item.cls"></i>
                    <span>{{item.good}}</span>
                  </div>
                </div>
                <div class="content">
                  <p class="user-content">{{item.content}}</p>
                </div>
              </li>
            </ul>
            <mt-spinner type="snake" v-if="!flag" color="orange" class="hold"></mt-spinner>
            <p v-if="flag" class="bottom">主人，人家真的没有了啊</p>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <!--底部区域-->
      <div class="foot">
        <span @click="toggleFav"><i class="icon-heart" :class="favCls"></i></span>
        <span><i class="icon-share"></i></span>
        <span><i class="icon-download3"></i></span>
        <span class="btn" @click="read">需看第一话</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getTicket, getDetail, getComment} from 'api/detail'
import {mapGetters, mapActions} from 'vuex'
import Others from 'base/others/others'
import {getDay} from 'common/js/util'

export default {
  data () {
    return {
      selected: '1',
      info: {},
      ticket: '',
      date: '',
      comment: [],
      totalNum: 0,
      page: 1,
      flag: false,
      loading: false
    }
  },
  components: {
    Others
  },
  computed: {
    isFav () {
      if (!this.favorite) {
        return
      }
      let fav = this.favorite
      let index = fav.findIndex((item) => {
        return item.id === this.comic.id
      })
      return index === -1
    },
    favCls () {
      return this.isFav ? '' : 'fav'
    },
    num () {
      if (!this.comic.update) {
        return
      }
      return parseInt(this.comic.update.replace(/[^0-9]/ig, ''))
    },
    bgImage () {
      return `background-image: url(${this.info.cover})`
    },
    tags () {
      if (!this.info.tags) {
        return
      }
      let ret = ''
      this.info.tags.forEach((item) => {
        ret += item + '|'
      })
      return ret
    },
    ...mapGetters([
      'comic',
      'favorite'
    ])
  },
  created () {
    this.date = getDay()
    this._getTicket()
    this._getDetail()
    this._getComment()
  },
  methods: {
    read () {
      this.addHistoryList({
        id: this.info.id,
        name: this.info.name,
        author: this.info.author,
        cover: this.info.cover,
        update: this.info.update
      })
    },
    toggleFav () {
      if (this.isFav) {
        console.log(1)
        this.addFavList(this.comic)
      } else {
        console.log(2)
        this.deleteFavList(this.comic)
      }
    },
    loadMore () {
      if (this.selected !== '3') {
        return
      }
      if (this.page * 10 >= this.totalNum) {
        this.flag = true
        return
      }
      console.log(1)
      this.page++
      this._getComment()
    },
    // 点赞
    toggleThumb (item) {
      if (!item.up) {
        item.cls = 'has'
        item.good++
        item.up = true
      } else {
        item.cls = ''
        item.good--
        item.up = false
      }
    },
    time (time) {
      return getDay(time)
    },
    _getComment () {
      if (!this.comic.id) {
        return
      }
      getComment(this.comic.id, this.page).then((res) => {
        if (res.status === 2) {
          this.comment = this.comment.concat(res.data.commentList)
          this.totalNum = res.data.totalNum
        }
      })
    },
    _getDetail () {
      if (!this.comic.id) {
        this.$router.back()
      }
      getDetail(this.comic.id).then((res) => {
        this.info = res
        console.log(this.info)
      })
    },
    _getTicket () {
      getTicket(this.comic.id).then((res) => {
        this.ticket = res.monthTicket
      })
    },
    ...mapActions([
      'addFavList',
      'deleteFavList',
      'addHistoryList',
      'clearHistoryList'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .comic-detail
    position: relative
    top: 50px
    height: 100%
    margin-bottom: 50px
    background-color :white
    .comic-banner
      height: 200px
      overflow :hidden
      .bg
        display :block
        height: 100%
        background-repeat :no-repeat
        background-size :cover
        filter: blur(15px)
      .info
        font-size: 12px
        color: white
        display: flex
        position: absolute
        top: 25px
        left: 50px
        .cover
          flex: 0 0 130px
          width: 130px
          margin-right: 20px
        .info-info
          flex :1
          display :flex
          justify-content :center
          flex-direction:column
          .title
            margin-bottom: 5px
            .name
              font-size: 18px
              font-weight: 700
          .tags
            margin-bottom: 5px
          .author
            margin-bottom: 5px
          .hot
            margin-bottom: 5px
          .num
            color: yellow
  /*每一快的内容*/
      #desc1
        .desc-info
          margin: 20px 15px
          padding: 10px 0
          line-height: 25px
          border-bottom:1px solid #ccc
      .menu
        padding:15px
        border-bottom:1px solid #ccc
        .title
          margin: 5px 0
          font-size: 12px
        .menu-list
          display: flex
          justify-content :space-between
          flex-wrap :wrap
          text-align :center
          .list-item
            flex :0 0 105px
            width: 105px
            height: 45px
            border: 1px solid #ccc
            border-radius :5px
            line-height: 45px
            margin: 10px 0
        .more
          margin-top: 10px
          text-align: center
          width: 100%
          height: 45px
          line-height: 45px
          border: 1px solid #ccc
          border-radius :5px
      .comment
        padding:15px
        border-bottom: 1px solid rgba(0,0,0,.1)
        .comment-ul
          .comment-li
            padding:10px 0
            border-bottom: 1px solid rgba(0,0,0,.1)
            display: flex
            flex-direction column
            justify-content:center
            &:last-child
              border-bottom: none
            .user-head
              position: relative
              font-size: 0
              .user-pic
                display:inline-block
                vertical-align: top
                height: 30px
                width: 30px
                img
                  height: 100%
                  width: 100%
                  border-radius :50%
              .user-info
                vertical-align: top
                margin-left: 5px
                display:inline-block
                margin-bottom: 5px
                font-size: 14px
                .user-name
                  color: orange
                  margin-bottom: 5px
              .icon
                vertical-align: top
                position: absolute
                top: 0
                right: 0
                font-size: 14px
                .icon-thumb-up
                  font-size: 14px
                  &.has
                    color:orange
            .content
              font-size: 14px
              margin-left: 35px
              line-height: 20px
        .mint-spinner-snake
          margin: 20px auto
        .bottom
          margin: 20px auto
          text-align: center
  /*底部导航条*/
    .foot
      position: fixed
      bottom: 0
      left: 0
      height: 50px
      width: 100%
      font-size: 20px
      line-height: 50px
      border-top: 1px solid rgba(0,0,0,.1)
      display :flex
      justify-content space-around
      background-color :#fff
      .fav
        color: orange
      .btn
        display :block
        width: 130px
        height: 30px
        line-height: 20px
        background-color: orange
        border-radius 5px
        color: #fff
        margin-top: 10px
</style>
