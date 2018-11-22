<template>
    <div class="history-wrapper">
      <empty :show="!history.length" size="200"></empty>
      <comic-list :list="history"></comic-list>
    </div>
</template>

<script type="text/ecmascript-6">
import Empty from 'base/empty/empty'
import ComicList from 'base/comic-list/comic-list'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'history'
    ])
  },
  components: {
    Empty,
    ComicList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .history-wrapper
    position: relative
    top: 40px
</style>
