import storage from 'good-storage'

const HISTORY = '__history__'
const FAVORITE = '__favorite__'
const MAX_LENGTH = 300

function addToArray (array, item, fun, max) {
  console.log(array)
  // 返回是不是有这条记录
  if (!array) {
    return
  }
  let num = array.findIndex(fun)
  // 如果是第一条记录
  if (num === 0) {
    return
  }
  // 有这条记录，但是记录不是第一个
  if (num > 0) {
    array.splice(num, 1)
  }
  array.unshift(item)
  if (array.length > max) {
    array.pop()
  }
}
// 删除
function deleteFromArray (array, fun) {
  let num = array.findIndex(fun)
  if (num > -1) {
    array.splice(num, 1)
  }
}

// 添加历史记录
function add (comic, name, max) {
  // 1,读取数据
  let history = storage.get(name, [])
  // 2,存数据
  addToArray(history, comic, (item) => {
    return item.id === comic.id
  }, max)
  storage.set(name, history)
  return history
}

// 2,读取记录
export function load (name) {
  return storage.get(name, [])
}

// 3,删除记录

function deletel (comic, name) {
  // 1,读取数据
  let list = storage.get(name, [])
  // 2,删除
  deleteFromArray(list, (item) => {
    return item.id === comic.id
  })
  storage.set(name, list)
  return list
}

// 4,清空记录
function clear (name) {
  storage.remove(name)
  return []
}

// 历史相关的
export function addHistory (comic) {
  return add(comic, HISTORY, MAX_LENGTH)
}
export function deleteHistory (comic) {
  return deletel(comic, HISTORY)
}
export function clearHistory () {
  return clear(HISTORY)
}
export function loadHistory () {
  return load(HISTORY)
}

// 我喜欢相关的
export function addFav (comic) {
  return add(comic, FAVORITE, MAX_LENGTH)
}
export function deleteFav (comic) {
  return deletel(comic, FAVORITE)
}
export function clearFav () {
  return clear(FAVORITE)
}
export function loadFav () {
  return load(FAVORITE)
}
