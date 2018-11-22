<template>
    <div class="comic-list">
      <ul class="comic-ul" v-if="list.length">
        <li v-for="(item, index) in list" :key="item.id"  class="comic-item" :style="bgColor">
          <div class="comic-cover">
            <img :src="item.cover" >
          </div>
          <div class="comic-info">
            <span class="comic-name">{{item.name}}</span>
            <span class="comic-author">{{item.author}}</span>
            <small class="comic-update">{{item.update}}</small>
            <small class="comic-desc ">{{item.desc}}</small>
          </div>
          <i class="index" v-text="inDex(index+4)" v-if="showIndex"></i>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    showIndex: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'nothing bu you !!!!'
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    bgc: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    bgColor () {
      return `background:${this.bgc}`
    }
  },
  methods: {
    inDex (num) {
      if (num < 10) {
        return '0' + num
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin.styl'
  .comic-list
    flex: 1
    padding: 5px
    .comic-ul
      .comic-item
        display: flex
        padding: 5px
        border-radius :5px
        margin-bottom: 5px
        .comic-cover
          flex: 0 0 70px
          width: 70px
          img
            width: 100%
            border-radius :2px
        .comic-info
          flex: 1
          margin-left: 10px
          display :flex
          flex-direction column
          overflow :hidden
          justify-content: center
          .comic-name
            color: $color-text-d
            font-weight: 700
            margin-bottom: 5px
          .comic-author
            margin-bottom: 5px
            font-size :$size-text-s
          .comic-update
            margin-bottom: 5px
            font-size :$size-text-s
          .comic-desc
            no-wrap()
            font-size :$size-text-s
</style>
