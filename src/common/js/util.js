export function getDay (time) {
  let myDate = time ? new Date(time * 1000) : new Date()
  let yy = myDate.getFullYear()
  let mm = myDate.getMonth() + 1
  let dd = myDate.getDate()
  return yy + '-' + mm + '-' + dd
}
