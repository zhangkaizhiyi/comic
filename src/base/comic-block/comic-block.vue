<template>
    <div class="comic-block">
      <ul v-show="list.length" class="comic-block-ul">
        <li v-for="item in list" :key="item.id" class="comic-item" :style="bgColor">
          <div class="comic-cover">
            <img :src="item.cover" >
          </div>
          <div class="info">
            <h1 class="comic-name">{{item.name}}</h1>
            <h2 class="comic-update">{{item.update}}</h2>
            <div class="comic-tags">
              <span v-for="tag in item.tags" :key="tag">{{tag + ' '}}</span>
            </div>
            <p class="comic-desc">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .comic-block-ul
    display: flex
    width: 100%
    flex-wrap wrap
    .comic-item
      width: 28%
      margin: 0 0 4% 4%
      text-align: center
      border-radius: 5px
      box-shadow: 3px 3px 3px
      .comic-cover
        width: 100%
        img
          width: 100%
      .info
        no-wrap()
        padding: 5px
        .comic-name
          color:$color-text-d
          font-weight: 700
          no-wrap()
        .comic-tags
          margin-top: 5px
          font-size $size-text-s
        .comic-desc
          margin-top: 5px
          font-size $size-text-s
          no-wrap()
</style>
