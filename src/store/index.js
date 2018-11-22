import Vue from 'vue'
import Vuex from 'vuex'

// 同步，异步，包装，state
import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations.js'
import state from './state.js'

import createLogger from 'vuex/dist/logger'

// 调试的时候呀使用的
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations, // 同步修改
  state,
  getters,
  actions, // 异步修改
  strict: debug, // 调试工具
  plugins: debug ? [createLogger()] : []
})
