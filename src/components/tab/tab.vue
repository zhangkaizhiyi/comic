<template>
    <div class="tab">
      <router-link tag="div" class="item" to="/classify">
        <i class="tab-icon classify"></i>
        <span>分类</span>
      </router-link>
      <router-link tag="div" class="item" to="/rank">
        <i class="tab-icon rank"></i>
        <span>排行</span>
      </router-link>
      <router-link tag="div" class="item" to="/time">
        <i class="tab-icon pursue"></i>
        <span>追更</span>
      </router-link>
      <router-link tag="div" class="item" to="/bookcase/history">
        <i class="tab-icon history"></i>
        <span>历史</span>
      </router-link>
    </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display :flex
    width: 100%
    height: 90px
    position: relative
    top: -30px
    background :url('background.png') no-repeat
    background-size :100% 90px
    font-size:12px
    .item
      flex: 1
      text-align :center
      .tab-icon
        display: block
        width: 34px
        height: 34px
        margin: 30px auto 5px
        background-repeat :no-repeat
        background-size:34px 34px
        &.classify
          background-image: url('classify.jpg')
        &.rank
          background-image: url('rank.jpg')
        &.pursue
          background-image: url('pursue.jpg')
        &.history
          background-image: url('history.png')
</style>
