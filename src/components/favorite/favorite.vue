<template>
    <div class="favorite">
      <empty :show="!favorite.length" size="200"></empty>
      <ul class="comic-ul">
        <li v-for="item in favorite" :key="item.id" class="comic-item">
          <div class="cover">
            <img :src="item.cover" width="100%">
          </div>
          <div class="info">
            <h1 class="title">{{item.title}}</h1>
            <p class="comic-update">{{item.update}}</p>
          </div>
        </li>
      </ul>
      <div class="backTo" @click="backTo">漫画书城</div>
      <div class="others-wrapper">
        <others text="大家都在搜"></others>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Empty from 'base/empty/empty'
import Others from 'base/others/others'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'favorite'
    ])
  },
  components: {
    Empty,
    Others
  },
  created () {
    console.log(this.favorite)
  },
  methods: {
    backTo () {
      this.$router.push({
        path: '/index'
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .favorite
    position: relative
    top: 40px
    .backTo
      font-weight: 700
      margin: 20px auto
      width: 100px
      height: 40px
      text-align center
      line-height: 34px
      border-radius 5px
      background-color: #fff
      border: 3px solid orange
    .others-wrapper
      background-color #fff
      padding-bottom:40px
    .comic-ul
      padding: 15px
      display: flex
      flex-wrap wrap
      .comic-item
        text-align: center
        flex: 0 0 105px
        width: 105px
        margin-right: 10px
        margin-bottom: 10px
        border: 1px solid rgba(0,0,0,.1)
        background-color: #fff
        border-radius :5px
        .info
          .title
            margin-bottom: 5px
          .comic-update
            margin-bottom: 5px
</style>
