import * as types from './mutation-types'

const mutations = {
  [types.SET_COMIC] (state, comic) {
    state.comic = comic
  },
  [types.SET_HISTORY] (state, comic) {
    state.history = comic
  },
  [types.SET_FAVORITE] (state, comic) {
    state.favorite = comic
  }
}

export default mutations
