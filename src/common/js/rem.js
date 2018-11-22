function setRem () {
  // 屏幕宽度
  const width = document.documentElement.clientWidth
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize =  + 'px'
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
