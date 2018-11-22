import {addHistory, addFav, deleteFav, deleteHistory, clearFav, clearHistory} from 'common/js/cache'
import * as types from './mutation-types'

export const addHistoryList = function ({commit}, comic) {
  let list = addHistory(comic)
  commit(types.SET_HISTORY, list)
}
export const deleteHistoryList = function ({commit}, comic) {
  let list = deleteHistory(comic)
  commit(types.SET_HISTORY, list)
}
export const clearHistoryList = function ({commit}) {
  clearHistory()
  commit(types.SET_HISTORY, [])
}
export const addFavList = function ({commit}, comic) {
  let list = addFav(comic)
  commit(types.SET_FAVORITE, list)
}
export const deleteFavList = function ({commit}, comic) {
  let list = deleteFav(comic)
  commit(types.SET_FAVORITE, list)
}
export const clearFavList = function ({commit}) {
  clearFav()
  commit(types.SET_FAVORITE, [])
}
