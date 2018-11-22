<template>
    <div class="classify-wrapper">
      <ul class="classify-upper">
        <li></li>
      </ul>
      <ul class="classify-under">
        <li v-for="item in list" :key="item.id" class="classify-under-item">
          <a :href="item.href">
            <span class="name">{{item.name}}</span>
            <img :src="item.src" height="100px" width="171px">
          </a>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {getClassify} from 'api/classify'

export default {
  components: {
    MHeader
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    getClassify().then((res) => {
      this.list = res
      console.log(res)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  .classify-wrapper
    position: relative
    top: 50px
    .classify-upper
      margin: 15px auto
      width: 93%
      height: 100px
      background :white
    .classify-under
      display :flex
      flex-wrap :wrap
      background :white
      .classify-under-item
        position: relative
        flex: 1 1 171px
        width: 171px
        margin-top: 15px
        .name
          position: absolute
          top: 50px
          left: 20px
</style>
