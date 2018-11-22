import Vue from 'vue'
import Router from 'vue-router'
import Favorite from 'components/favorite/favorite'
import Classify from 'components/classify/classify'
import Rank from 'components/rank/rank'
import Time from 'components/time/time'
import History from 'components/history/history'
import Index from 'components/index/index'
import Search from 'components/search/search'
import ComicDetail from 'components/comic-detail/comic-detail'
import BookCase from 'components/book-case/book-case'
import SearchResult from 'components/search-result/search-result'
import More from 'components/index/more/more'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    // 主页
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'more',
          name: 'more',
          component: More
        }
      ]
    },
    {
      path: '/time',
      name: 'time',
      component: Time
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SearchResult
        }
      ]
    },
    {
      path: '/bookcase',
      name: 'bookcase',
      component: BookCase,
      children: [
        {
          path: 'history',
          name: 'history',
          component: History
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: Favorite
        }
      ]
    },
    {
      path: '/comic/:id',
      name: 'comic',
      component: ComicDetail
    }
  ]
})
