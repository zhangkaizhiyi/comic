<template>
    <div class="empty" v-if="show" :style="style">
      <img src="./empty-girl.png" >
      <p class="empty-text">{{text}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    size: {
      type: String,
      default: '300'
    },
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '空空如也，除了你的爱'
    }
  },
  computed: {
    style () {
      return `width:${this.size}px`
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .empty
    margin: 20px auto
    text-align: center
    img
      width: 100%
    .empty-text
      margin-top: 10px
      font-size: 20px
      font-weight: 700
</style>
